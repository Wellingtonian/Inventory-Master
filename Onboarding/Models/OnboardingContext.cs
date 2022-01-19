using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Onboarding.Models
{
    public partial class OnboardingContext : DbContext
    {
        public OnboardingContext()
        {
        }

        public OnboardingContext(DbContextOptions<OnboardingContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Sale> Sales { get; set; }
        public virtual DbSet<Store> Store { get; set; }
    }
}
