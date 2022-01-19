using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onboarding.Models;
using Onboarding.Models.DTOs;

namespace Onboarding.Controllers
{
    public class StoreController : Controller
    {
        private readonly OnboardingContext _db;
        private int _defaultRecordTakeLimit = 10;

        public StoreController(OnboardingContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
			return View();
        }

        /// <summary>
        /// A HttpGet method.
        /// Retrieves either a single store by id or all on a page of size limit.
        /// </summary>
        /// <returns>A json response containing the requested store or all stores on a page of size limit if no id; or a NotFound response.</returns>
		[HttpGet]
        public IActionResult Fetch(int? id, int? page, int? limit)
        {
            if (id.HasValue)
            {
                try
                {
                    var store = _db.Store.Single(x => x.Id == id);

                    return Json(StoreToDTO(store));
                }
                catch (InvalidOperationException)
                {
                    return NotFound();
                }
            }
            else
            {
                int skip = page.HasValue && limit.HasValue ? limit.Value * page.Value : 0;
                int take = limit ?? _defaultRecordTakeLimit;

                var storesQuery = _db.Store.Select(x => StoreToDTO(x));

                if (storesQuery.Count() > 0)
                {
                    var stores = storesQuery.ToList();

                    return Json(stores);
                }

                return NotFound();
            }
        }

        /// <summary>
        /// A HttpGet method.
        /// Returns a count of all stores.
        /// </summary>
        /// <returns>A json response containing the total amount of stores.</returns>
        [HttpGet]
        public IActionResult FetchCount()
        {
            var storesQuery = _db.Store;

            return Json(new { count = storesQuery.Count() });
        }

        /// <summary>
        /// A HttpPost method.
        /// Creates a new store if valid. Only binds on Name and Address.
        /// A new store will be assigned a new Id by the database and doesn't start with any sales associated with them.
        /// </summary>
        /// <returns>A json response containing the finalised details of the new store or a BadRequest response.</returns>
		[HttpPost]
        public IActionResult Create([Bind("Name, Address")][FromBody] Store newStore)
        {
            if (ModelState.IsValid)
            {
                _db.Store.Add(newStore);

                _db.SaveChanges();

                return Json(StoreToDTO(newStore));
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// A HttpPut method.
        /// Updates the details of an existing store. Only binds on Id, Name and Address.
        /// </summary>
        /// <returns>A json response containing the finalised details of the edited store or a BadRequest response.</returns>
		[HttpPut]
        public IActionResult Update([Bind("Id, Name, Address")][FromBody] Store editStore)
        {
            if (ModelState.IsValid)
            {
				try
				{
                    Store store = _db.Store.Single(x => x.Id == editStore.Id);
					store.Name = editStore.Name;
					store.Address = editStore.Address;

                    _db.SaveChanges();

					return Json(StoreToDTO(store));
				}
				catch(InvalidOperationException)
				{
                    return BadRequest();
				}
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// A HttpDelete method.
        /// Tries to delete a store by id.
        /// </summary>
        /// <returns>A json response containing "deleted = true" or a BadRequest response.</returns>
		[HttpDelete]
		public IActionResult Delete(int id)
		{
			try
			{
                Store storeToRemove = _db.Store.Single(x => x.Id == id);
				_db.Store.Remove(storeToRemove);

                _db.SaveChanges();

				return Json(new { deleted = true });
			}
            catch (DbUpdateException)
            {
                return BadRequest("You can't delete this store as it's referenced by another record.");
            }
            catch (ArgumentNullException)
			{
                return BadRequest();
			}
		}

        /// <summary>
        /// Converts a store into an appropriate DTO (Data Transfer Object).
        /// </summary>
        [NonAction]
        private StoreDTO StoreToDTO(Store store)
        {
            return new StoreDTO(store);
        }
    }
}