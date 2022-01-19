using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Onboarding.Models.DTOs
{
    public class ProductDTO
    {
        public ProductDTO(Product product)
        {
            Id = product.Id;
            Name = product.Name;
            Price = product.Price;
        }

        public int Id { get; private set; }
        public string Name { get; private set; }
        public decimal Price { get; private set; }
    }
}
