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
	public class SaleController : Controller
	{
		private readonly OnboardingContext _db;
		private int _defaultRecordTakeLimit = 10;

		public SaleController(OnboardingContext db)
		{
			_db = db;
		}

		public IActionResult Index()
		{
			return View();
		}

		/// <summary>
		/// A HttpGet method.
		/// Retrieves either a single sale by id or all on a page of size limit.
		/// </summary>
		/// <returns>A json response containing the requested sale or all sales on a page of size limit if no id; or a NotFound response.</returns>
		[HttpGet]
		public IActionResult Fetch(int? id, int? page, int? limit)
		{
			if (id.HasValue)
			{
				try
				{
					var sale = _db.Sales
						.Include(x => x.Store)
						.Include(x => x.Customer)
						.Include(x => x.Product)
						.Single(x => x.Id == id);

					return Json(SaleToDTO(sale));
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

				var salesQuery = _db.Sales
						.Include(x => x.Store)
						.Include(x => x.Customer)
						.Include(x => x.Product)
						.Select(x => SaleToDTO(x));

				if (salesQuery.Count() > 0)
				{
					var sales = salesQuery.ToList();

					return Json(sales);
				}

				return NotFound();
			}
		}

		/// <summary>
		/// A HttpGet method.
		/// Returns a count of all sales.
		/// </summary>
		/// <returns>A json response containing the total amount of sales.</returns>
		[HttpGet]
		public IActionResult FetchCount()
		{
			var salesQuery = _db.Sales;

			return Json(new { count = salesQuery.Count() });
		}

		/// <summary>
		/// A HttpPost method.
		/// Creates a new sale if valid. Only binds on StoreId, CustomerId, ProductId, DateSold.
		/// A new sale will be assigned a new Id by the database.
		/// </summary>
		/// <returns>A json response containing the finalised details of the new sale or a BadRequest response.</returns>
		[HttpPost]
		public IActionResult Create([Bind("StoreId, CustomerId, ProductId, DateSold")][FromBody] Sale newSale)
		{
			if (ModelState.IsValid)
			{
				_db.Sales.Add(newSale);

				_db.SaveChanges();

				// Load all the navigation properties so we can return those details.
				_db.Entry(newSale).Reference(x => x.Store).Load();
				_db.Entry(newSale).Reference(x => x.Customer).Load();
				_db.Entry(newSale).Reference(x => x.Product).Load();

				return Json(SaleToDTO(newSale));
			}

			return BadRequest(ModelState);
		}

		/// <summary>
		/// A HttpPut method.
		/// Updates the details of an existing sale. Only binds on Id, StoreId, CustomerId, ProductId and DateSold.
		/// </summary>
		/// <returns>A json response containing the finalised details of the edited sale or a BadRequest response.</returns>
		[HttpPut]
		public IActionResult Update([Bind("Id, StoreId, CustomerId, ProductId, DateSold")][FromBody] Sale editSale)
		{
			if (ModelState.IsValid)
			{
				try
				{
					Sale sale = _db.Sales.Single(x => x.Id == editSale.Id);

					sale.StoreId = editSale.StoreId;
					sale.CustomerId = editSale.CustomerId;
					sale.ProductId = editSale.ProductId;
					sale.DateSold = editSale.DateSold;

					_db.SaveChanges();

					// Load all the navigation properties so we can return those details.
					_db.Entry(sale).Reference(x => x.Store).Load();
					_db.Entry(sale).Reference(x => x.Customer).Load();
					_db.Entry(sale).Reference(x => x.Product).Load();

					return Json(SaleToDTO(sale));
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
		/// Tries to delete a sale by id.
		/// </summary>
		/// <returns>A json response containing "deleted = true" or a BadRequest response.</returns>
		[HttpDelete]
		public IActionResult Delete(int id)
		{
			try
			{
				Sale saleToRemove = _db.Sales.Single(x => x.Id == id);

				_db.Sales.Remove(saleToRemove);

				_db.SaveChanges();

				return Json(new { deleted = true });
			}
			catch (ArgumentNullException)
			{
				return BadRequest();
			}
		}

		/// <summary>
		/// Converts a sale into an appropriate DTO (Data Transfer Object).
		/// </summary>
		[NonAction]
		private SaleDTO SaleToDTO(Sale sale)
		{
			return new SaleDTO(sale);
		}
	}
}