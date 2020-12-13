using AutoMapper;
using BlogApplication.Core.IRepositories;
using BlogApplication.Core.IServices;
using BlogApplication.Core.IUnitOfWorks;
using BlogApplication.Data;
using BlogApplication.Data.Repositories;
using BlogApplication.Data.UnitOfWorks;
using BlogApplication.Service.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Text.Json;

namespace BlogApplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(Startup));
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddDbContext<BlogDataContext>(options =>
            {
                options.UseSqlServer(Configuration["ConnectionStrings:SqlServerConnection"], o =>
                {
                    o.MigrationsAssembly("BlogApplication.Data");
                });
            });

            services.AddScoped(typeof(IService), typeof(RepositoryService));
            services.AddScoped(typeof(IRepository), typeof(Repository));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });


            services.Configure<FormOptions>(options =>
            {
                options.MemoryBufferThreshold = Int32.MaxValue;
                options.BufferBodyLengthLimit = Int32.MaxValue;
                options.MultipartBodyLengthLimit = Int32.MaxValue;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
