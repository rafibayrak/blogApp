using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApplication.DataContact
{
    public class DataTableParameter
    {
        public string Orderby { get; set; }
        public string Filter { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
    }
}
