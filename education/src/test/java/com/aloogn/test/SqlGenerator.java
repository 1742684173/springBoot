package com.aloogn.test;

import org.mybatis.generator.api.MyBatisGenerator;
import org.mybatis.generator.api.ProgressCallback;
import org.mybatis.generator.config.Configuration;
import org.mybatis.generator.config.xml.ConfigurationParser;
import org.mybatis.generator.exception.InvalidConfigurationException;
import org.mybatis.generator.exception.XMLParserException;
import org.mybatis.generator.internal.DefaultShellCallback;

import java.io.*;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SqlGenerator {
    private static final String BASE_PACKAGE = "${basePackage}";
    private static final String TABLE_NAME = "${tableName}";
    private static final String VIEW_PROPERTY = "${viewProperty}";
    private static final String VIEW_PROPERTY_VALUE = "<property name=\"type\" value=\"view\"/>";

    public static void main(String[] args) throws Exception {
        List<String> warnings = new ArrayList<String>();
        boolean overwrite = true;
        String genCfg = "/mbg.xml";
        File configFile = new File(SqlGenerator.class.getResource(genCfg).getFile());
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = null;
        try {
            config = cp.parseConfiguration(configFile);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (XMLParserException e) {
            e.printStackTrace();
        }
        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
        MyBatisGenerator myBatisGenerator = null;
        try {
            myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
        } catch (InvalidConfigurationException e) {
            e.printStackTrace();
        }
        try {
            myBatisGenerator.generate(null);
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

//        List<String> warnings = new ArrayList<String>();
//        boolean overwrite = true;
//        //mbg.xml配置文件
//        File configFile = new File(SqlGenerator.class.getResource("/mbg.xml").getFile());
//        ConfigurationParser cp = new ConfigurationParser(warnings);
//        Configuration config = cp.parseConfiguration(configFile);
//        DefaultShellCallback callback = new DefaultShellCallback(overwrite);
//        MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
//        myBatisGenerator.generate(null);

//        TableInfo tableInfo = new TableInfo("com.aloogn.education", "manager_user", false);
//        try{
//            String xml = getXMl(tableInfo);
//            InputStream inputStream = new ByteArrayInputStream(xml.getBytes());
//            generator(inputStream);
//        }catch (IOException e){
//            e.printStackTrace();
//        }
    }

    private static void generator(InputStream inputStream) {

        List<String> warnings = new ArrayList();
        ConfigurationParser cp = new ConfigurationParser(warnings);
        Configuration config = null;
        try {
            config = cp.parseConfiguration(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (XMLParserException e) {
            e.printStackTrace();
        }
        DefaultShellCallback callback = new DefaultShellCallback(true);
        MyBatisGenerator myBatisGenerator = null;
        try {
            myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
        } catch (InvalidConfigurationException e) {
            e.printStackTrace();
        }
        try {
            myBatisGenerator.generate(new ProgressCallback() {
                @Override
                public void introspectionStarted(int i) {

                }

                @Override
                public void generationStarted(int i) {

                }

                @Override
                public void saveStarted(int i) {

                }

                @Override
                public void startTask(String s) {

                }

                @Override
                public void done() {

                }

                @Override
                public void checkCancel() throws InterruptedException {

                }
            });
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public static String getXMl(TableInfo tableInfo) throws IOException{
        InputStream inputStream = SqlGenerator.class.getResourceAsStream("/generateConfig.xml");
        //替换表信息
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String line = null;
        StringBuilder xmlContent = new StringBuilder();
        while ((line = bufferedReader.readLine()) != null){
            line = line.replace(BASE_PACKAGE,tableInfo.getBasePackage());
            line = line.replace(TABLE_NAME,tableInfo.getTableName());
            if(tableInfo.isView()){
                line = line.replace(VIEW_PROPERTY,VIEW_PROPERTY_VALUE);
            }else{
                line = line.replace(VIEW_PROPERTY,"");
            }
            xmlContent.append(line);
        }

        return xmlContent.toString();
    }

    public static final class TableInfo {

        public TableInfo(String basePackage, String tableName, boolean view) {
            this.basePackage = basePackage;
            this.tableName = tableName;
            this.view = view;
        }

        //基础包路径
        private String basePackage;
        //表名称
        private String tableName;
        //是否是视图
        private boolean view;

        public String getBasePackage() {
            return basePackage;
        }

        public void setBasePackage(String basePackage) {
            this.basePackage = basePackage;
        }

        public String getTableName() {
            return tableName;
        }

        public void setTableName(String tableName) {
            this.tableName = tableName;
        }

        public boolean isView() {
            return view;
        }

        public void setView(boolean view) {
            this.view = view;
        }
    }
}
