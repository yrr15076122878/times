<%@ WebHandler Language="C#" Class="ObtainYear" %>

using System;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using System.Web.Script.Serialization;
using System.Collections.Generic;
using System.Collections;

public class ObtainYear : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        DataTable dt = Data("select  distinct [year] from  dbo.Exhibitors where [YEAR] <> '' order by [year]");
        if (dt != null)
        {
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            javaScriptSerializer.MaxJsonLength = Int32.MaxValue; //取得最大数值 
            ArrayList arrayList = new ArrayList();
            foreach (DataRow dataRow in dt.Rows)
            {
                Dictionary<string, object> dictionary = new Dictionary<string, object>();  //实例化一个参数集合    
                foreach (DataColumn dataColumn in dt.Columns)
                {
                    dictionary.Add(dataColumn.ColumnName, dataRow[dataColumn.ColumnName].ToString());
                }
                arrayList.Add(dictionary); //ArrayList集合中添加键值     
            }
            context.Response.Write(javaScriptSerializer.Serialize(arrayList));  //返回一个json字符串
        }
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }
    public DataTable Data(string sql)
    {
        SqlConnection cn = new SqlConnection();
        cn.ConnectionString = @"Data Source=.;Initial Catalog=NMEExhibitor;User ID=sa;Password=123;packet size=1000";
        cn.Open();
        SqlCommand cmd = new SqlCommand();
        cmd.Connection = cn;
        cmd.CommandText = sql;

        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        cn.Dispose();
        cn.Close();
        return dt;
    }
}