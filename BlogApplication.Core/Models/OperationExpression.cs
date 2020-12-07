using System;
using System.Collections.Generic;
using System.Text;

namespace BlogApplication.Core.Models
{
    public enum OperationExpression
    {
        Equals,
        NotEquals,
        Minor,
        MinorEquals,
        Mayor,
        MayorEquals,
        Like,
        Contains,
        Any
    }
}
