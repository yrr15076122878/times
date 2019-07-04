<%@ WebHandler Language="C#" Class="Handler2" %>

using System;
using System.Web;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using System.Web.Script.Serialization;
using System.Collections.Generic;
using System.Collections;

public class Handler2 : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        object zong = Count(); //查询总数量
        int page = 1;
        if (context.Request.QueryString["page"] != "" && context.Request.QueryString["page"]!=null)
        {
            page = Convert.ToInt32(context.Request.QueryString["page"]);
        }
        DataTable dt = GetDt(page, 4);
        
        if (dt.Rows.Count > 0)
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
                dictionary.Add("Count",zong);
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
    public int iud(string sql)
    {
        SqlConnection con = new SqlConnection();
        con.ConnectionString = @"Data Source=.;Initial Catalog=NMEExhibitor;User ID=sa;Password=123;packet size=1000";
        con.Open();
        SqlCommand com = new SqlCommand();
        com.Connection = con;
        com.CommandText = sql;
        return com.ExecuteNonQuery();
    }
    public DataTable GetDt(int pageindex, int pagesize)
    {

        StringBuilder sql = new StringBuilder();


        //if (pageindex == 1)
        //{
        //    sql.Append("SELECT top " + pagesize + "  eid,CompanyCn,CompanyEn,myTextBoxCn as IntroCn,myTextBoxEn as IntroEn,NetCn as detailCn,NetEn as detailEn,Uplogosrc  from Exhibitors   order by addtime desc");
        //}
        //else
        //{
        //    sql.Append("SELECT  top " + pagesize + " eid,CompanyCn,CompanyEn,myTextBoxCn as IntroCn,myTextBoxEn as IntroEn,NetCn as detailCn,NetEn as detailEn,Uplogosrc from Exhibitors where  addtime<(select min(addtime) from (select top " + pagesize * (pageindex - 1) + " addtime from Exhibitors  order by addtime desc) gg )");
        //    sql.Append(" order by addtime desc");
        //}
        sql.Append("select eid,CompanyCn,CompanyEn,myTextBoxCn as IntroCn,myTextBoxEn as IntroEn,NetCn as detailCn,NetEn as detailEn,Uplogosrc from (select ROW_NUMBER() over (order by eid) as HangHao, *  from Exhibitors) pageduserinfo");
        sql.Append(" where HangHao between  (" + pageindex + " - 1)* " + pagesize + " + 1 and " + pagesize + " * " + pageindex + "");
       
        DataTable dtcollList = Data(sql.ToString());

        return dtcollList;
    }

    public int Count() //获取总数量
    {
        string s = string.Format("select count(*) from Exhibitors");
        //SqlConnection con = new SqlConnection("");
        //SqlDataAdapter da = new SqlDataAdapter(s, con);
        //DataSet ds = new DataSet();
        //da.Fill(ds);
        //return ds.Tables[0];

        using (SqlConnection con = new SqlConnection("Data Source=.;Initial Catalog=NMEExhibitor;User ID=sa;Password=123;packet size=1000"))
        {
            using (SqlCommand cmd = new SqlCommand(s, con))
            {
                con.Open();
                return Convert.ToInt32(cmd.ExecuteScalar());
            }
        }
    }
}