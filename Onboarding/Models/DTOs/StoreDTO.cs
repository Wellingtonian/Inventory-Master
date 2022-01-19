using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Onboarding.Models.DTOs
{
    public class StoreDTO
    {
        public StoreDTO(Store store)
        {
            Id = store.Id;
            Name = store.Name;
            Address = store.Address;
        }

        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Address { get; private set; }
    }
}
