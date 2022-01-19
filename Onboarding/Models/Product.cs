using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Onboarding.Models
{
    public partial class Product
    {
        public Product()
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
        [Column(TypeName = "money")]
        public decimal Price { get; set; }
        #endregion

        #region Navigation Properties
        [InverseProperty("Product")]
        public ICollection<Sale> Sales { get; set; }
        #endregion
    }
}
