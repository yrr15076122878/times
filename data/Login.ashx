<%@ WebHandler Language="C#" Class="Handler3" %>

using System;
using System.Web;
using System.Data.SqlClient;
using System.Data;
    using System.Web.SessionState;

public class Handler3 : IHttpHandler ,IRequiresSessionState{

    public void ProcessRequest(HttpContext context)
    {
        string phone = context.Request.Form["email"];
        string pass = context.Request.Form["psw"];
        string sql = "select * from EList where EUser='" + phone + "'";
        DataTable dt = Data(sql);
        if (dt.Rows.Count > 0)
        {
            sql += "  and  EPass='" + pass + "'";
            DataTable dt2 = Data(sql);
            if (dt2.Rows.Count > 0)
            {
                string sxs = dt2.Rows[0]["Eid"].ToString();
                context.Session["Id"] = sxs;
                DataTable dt3 = Data("select count(distinct [year]) from Exhibitors");
                if (dt3.Rows.Count > 1)
                {
                    context.Response.Write("2");//跳转到选择年份页面
                }
                else
                {
                    context.Response.Write("3");//跳转到展商信息页
                }
            }
            else
            {
                context.Response.Write("1");//密码错误
            }
        }
        else
        {
            context.Response.Write("0"); //用户名错误
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