using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Onboarding.Models;
using Onboarding.Models.DTOs;

namespace Onboarding.Controllers
{
    public class CustomerController : Controller
    {
        private readonly OnboardingContext _db;
        private int _defaultRecordTakeLimit = 10;

        public CustomerController(OnboardingContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// A HttpGet method.
        /// Retrieves either a single customer by id or all on a page of size limit.
        /// </summary>
        /// <returns>A json response containing the requested customer or all customers on a page of size limit if no id; or a NotFound response.</returns>
		[HttpGet]
        public IActionResult Fetch(int? id, int? page, int? limit)
        {
            if (id.HasValue)
            {
                try
                {
                    var customer = _db.Customer.Single(x => x.Id == id);

                    return Json(CustomerToDTO(customer));
                }
                catch (InvalidOperationException)
                {
                    return NotFound();
                }
            }
            else
            {
                int skip = page.HasValue && limit.HasValue ? limit.Value * (page.Value - 1) : 0;
                int take = limit ?? _defaultRecordTakeLimit;
                var customersQuery = _db.Customer.Skip(skip).Take(take).Select(x => CustomerToDTO(x));

                if (customersQuery.Count() > 0)
                {
                    var customers = customersQuery.ToList();

                    return Json(customers);
                }

                return NotFound();
            }
        }

        /// <summary>
        /// A HttpGet method.
        /// Returns a count of all customers.
        /// </summary>
        /// <returns>A json response containing the total amount of customers.</returns>
        [HttpGet]
        public IActionResult FetchCount()
        {
            var customersQuery = _db.Customer;

            return Json(new { count = customersQuery.Count() });
        }

        /// <summary>
        /// A HttpPost method.
        /// Creates a new customer if valid. Only binds on Name and Address.
        /// A new customer will be assigned a new Id by the database and doesn't start with any sales associated with them.
        /// </summary>
        /// <returns>A json response containing the finalised details of the new customer or a BadRequest response.</returns>
		[HttpPost]
        public IActionResult Create([Bind("Name, Address")][FromBody] Customer newCustomer)
        {
            if (ModelState.IsValid)
            {
                _db.Customer.Add(newCustomer);

                _db.SaveChanges();

                return Json(CustomerToDTO(newCustomer));
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// A HttpPut method.
        /// Updates the details of an existing customer. Only binds on Id, Name and Address.
        /// </summary>
        /// <returns>A json response containing the finalised details of the edited customer or a BadRequest response.</returns>
		[HttpPut]
        public IActionResult Update([Bind("Id, Name, Address")][FromBody] Customer editCustomer)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    Customer customer = _db.Customer.Single(x => x.Id == editCustomer.Id);
                    customer.Name = editCustomer.Name;
                    customer.Address = editCustomer.Address;

                    _db.SaveChanges();

                    return Json(CustomerToDTO(customer));
                }
                catch (InvalidOperationException)
                {
                    return BadRequest();
                }
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// A HttpDelete method.
        /// Tries to delete a customer by id.
        /// </summary>
        /// <returns>A json response containing "deleted = true" or a BadRequest response.</returns>
		[HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                Customer customerToRemove = _db.Customer.Single(x => x.Id == id);
                _db.Customer.RemoveRange(customerToRemove);

                _db.SaveChanges();

                return Json(new { deleted = true });
            }
            catch (DbUpdateException)
            {
                return BadRequest("You can't delete this customer as it's referenced by another record.");
            }
            catch (ArgumentNullException)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// Converts a customer into an appropriate DTO (Data Transfer Object).
        /// </summary>
        [NonAction]
        private CustomerDTO CustomerToDTO(Customer customer)
        {
            return new CustomerDTO(customer);
        }
    }
}