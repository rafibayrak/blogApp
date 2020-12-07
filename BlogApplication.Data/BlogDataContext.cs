using BlogApplication.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BlogApplication.Data
{
    public class BlogDataContext : DbContext
    {
        public BlogDataContext(DbContextOptions<BlogDataContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<CategoryPostItem> CategoryPostItems { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
