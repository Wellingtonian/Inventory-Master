using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Onboarding.Models.DTOs
{
    public class SaleDTO
    {
        public SaleDTO(Sale sale)
        {
            Id = sale.Id;
            Store = new StoreDTO(sale.Store);
            Customer = new CustomerDTO(sale.Customer);
            Product = new ProductDTO(sale.Product);
            DateSold = sale.DateSold;
        }

        public int Id { get; private set; }
        public StoreDTO Store { get; private set; }
        public CustomerDTO Customer { get; private set; }
        public ProductDTO Product { get; private set; }
        public DateTime DateSold { get; private set; }
    }
}
