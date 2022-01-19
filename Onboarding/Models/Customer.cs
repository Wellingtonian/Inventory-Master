using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Onboarding.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sale>();
        }

        #region Properties
        [Key()]
        public int Id { get; set; }

        [Required()]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required()]
        [MaxLength(250)]
        public string Address { get; set; }
        #endregion


        #region Navigation Properties
        [InverseProperty("Customer")]
        public ICollection<Sale> Sales { get; set; }
        #endregion
    }
}
