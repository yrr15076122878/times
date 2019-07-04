<%@ WebHandler Language="C#" Class="LoginEmail" %>

using System;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Web.SessionState;

public class LoginEmail : IHttpHandler,IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        
        string email = context.Request.Form["email"];
        string psw = context.Request.Form["psw"];
        DataTable dt = Data("select * from dbo.UserList where UserEmail='" + email + "' and UserPass= '" + psw + "'");
        if (dt.Rows.Count > 0)
        {
            context.Session["Id"] = dt.Rows[0]["Id"].ToString();
            DataTable dt2 = Data("select * from UserTable where [UID] = '"+dt.Rows[0]["Id"]+"'");
            if (dt2 != null)
            {
                context.Session["VIP"] = dt2.Rows[0]["Category"].ToString();
            }
            context.Response.Write("1");
        }
        else
        {
            context.Response.Write("0");//错误
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
        cn.ConnectionString = @"Data Source=.;Initial Catalog=RegData;User ID=sa;Password=123;packet size=1000";
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