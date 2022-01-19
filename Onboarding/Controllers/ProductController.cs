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
    public class ProductController : Controller
    {
        private readonly OnboardingContext _db;
        private int _defaultRecordTakeLimit = 10;

        public enum ProductField
        {
            Id,
            Name,
            Price
        }

        public ProductController(OnboardingContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
			return View();
        }

        /// <summary>
        /// A HttpGet method.
        /// Retrieves either a single product by id or all on a page of size limit.
        /// 
        /// Example of expected route:
        /// /Product/Fetch/{id}?page={page}&limit={limit}&orderby={orderBy}&ordering={ordering}
        /// </summary>
        /// <returns>A json response containing the requested product or all products on a page of size limit if no id; or a NotFound response.</returns>
		[HttpGet]
        public IActionResult Fetch(int? id, int? page, int? limit, ProductField? orderBy, Ordering? ordering)
        {
            if (id.HasValue)
            {
                try
                {
                    var product = _db.Product.Single(x => x.Id == id);

                    return Json(ProductToDTO(product));
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

                IQueryable<ProductDTO> productsQuery = _db.Product.Select(x => ProductToDTO(x));
                //switch ((orderBy, ordering))
                //{
                //    case (ProductField.Id, Ordering.Ascending):
                //        productsQuery = productsQuery.OrderBy(x => x.Id);
                //        break;
                //    case ProductField.Name:
                //        productsQuery = productsQuery.OrderBy(x => x.Name);
                //        break;
                //    case ProductField.Price:
                //        productsQuery = productsQuery.OrderBy(x => x.Price);
                //        break;
                //}

                if (productsQuery.Count() > 0)
                {
                    var products = productsQuery.ToList();

                    return Json(products);
                }

                return NotFound();
            }
        }

        /// <summary>
        /// A HttpGet method.
        /// Returns a count of all products.
        /// </summary>
        /// <returns>A json response containing the total amount of products.</returns>
        [HttpGet]
        public IActionResult FetchCount()
        {
            var productsQuery = _db.Product;

            return Json(new { count = productsQuery.Count() });
        }

        /// <summary>
        /// A HttpPost method.
        /// Creates a new product if valid. Only binds on Name and Price.
        /// A new product will be assigned a new Id by the database and doesn't start with any sales associated with them.
        /// </summary>
        /// <returns>A json response containing the finalised details of the new product or a BadRequest response.</returns>
		[HttpPost]
        public IActionResult Create([Bind("Name, Price")][FromBody] Product newProduct)
        {
            if (ModelState.IsValid)
            {
                _db.Product.Add(newProduct);

                _db.SaveChanges();

                return Json(ProductToDTO(newProduct));
            }

            return BadRequest(ModelState);
        }

        /// <summary>
        /// A HttpPut method.
        /// Updates the details of an existing product. Only binds on Id, Name and Price.
        /// </summary>
        /// <returns>A json response containing the finalised details of the edited product or a BadRequest response.</returns>
		[HttpPut]
        public IActionResult Update([Bind("Id, Name, Price")][FromBody] Product editProduct)
        {
            if (ModelState.IsValid)
            {
				try
				{
                    Product product = _db.Product.Single(x => x.Id == editProduct.Id);
					product.Name = editProduct.Name;
					product.Price = editProduct.Price;

                    _db.SaveChanges();

					return Json(ProductToDTO(product));
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
        /// Tries to delete a product by id.
        /// </summary>
        /// <returns>A json response containing "deleted = true" or a BadRequest response.</returns>
		[HttpDelete]
		public IActionResult Delete(int id)
		{
			try
			{
                Product productToRemove = _db.Product.Single(x => x.Id == id);
				_db.Product.Remove(productToRemove);

                _db.SaveChanges();

				return Json(new { deleted = true });
			}
            catch (DbUpdateException)
            {
                return BadRequest("You can't delete this product as it's referenced by another record.");
            }
			catch (ArgumentNullException)
			{
                return BadRequest();
			}
		}

        /// <summary>
        /// Converts a product into an appropriate DTO (Data Transfer Object).
        /// </summary>
        [NonAction]
        private ProductDTO ProductToDTO(Product product)
        {
            return new ProductDTO(product);
        }
    }
}