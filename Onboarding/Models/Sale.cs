using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Onboarding.Models
{
    public partial class Sale
    {
        #region Properties
        [Key()]
        public int Id { get; set; }

        [Required()]
        public int StoreId { get; set; }

        [Required()]
        public int CustomerId { get; set; }

        [Required()]
        public int ProductId { get; set; }

        [Required()]
        [Column(TypeName = "datetime")]
        public DateTime DateSold { get; set; }
        #endregion

        #region Navigation Properties
        public Store Store { get; set; }
        public Customer Customer { get; set; }
        public Product Product { get; set; }
        #endregion
    }
}
