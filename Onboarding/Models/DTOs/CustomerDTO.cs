using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Onboarding.Models.DTOs
{
    public class CustomerDTO
    {
        public CustomerDTO(Customer customer)
        {
            Id = customer.Id;
            Name = customer.Name;
            Address = customer.Address;
        }

        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Address { get; private set; }
    }
}
