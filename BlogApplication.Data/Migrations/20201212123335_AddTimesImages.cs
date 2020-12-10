using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BlogApplication.Data.Migrations
{
    public partial class AddTimesImages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "Images",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ModificationTime",
                table: "Images",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationTime",
                table: "ImageFolders",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "ModificationTime",
                table: "ImageFolders",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ModificationTime",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "CreationTime",
                table: "ImageFolders");

            migrationBuilder.DropColumn(
                name: "ModificationTime",
                table: "ImageFolders");
        }
    }
}
