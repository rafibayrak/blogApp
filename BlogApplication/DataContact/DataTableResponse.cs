using System;
using System.Collections.Generic;
using System.Text;

namespace BlogApplication.DataContact
{
    public class DataTableResponse<TEntry> where TEntry : class
    {
        public int filterRows { get; set; }
        public IEnumerable<TEntry> source { get; set; }
    }
}
