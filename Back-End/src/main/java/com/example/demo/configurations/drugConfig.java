//package com.example.demo.configurations;
//
//import com.example.demo.models.Drug;
//import com.example.demo.repositories.DrugsRepository;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import java.io.File;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Scanner;
//
//@Configuration
//public class drugConfig {
//
//    @Bean
//    CommandLineRunner commandLineRunner(DrugsRepository drugsRepository) {
//        return args -> {
//            List<Drug> drugsList= new ArrayList<>();
//            Drug newDrug ;
//            File brandNamesFile = new File("C:\\Users\\abuhu\\OneDrive\\Desktop\\final\\src\\main\\java\\com\\example\\demo\\configurations\\BrandNames.txt");
//            File genericNamesFile = new File("C:\\Users\\abuhu\\OneDrive\\Desktop\\final\\src\\main\\java\\com\\example\\demo\\configurations\\GenericNames.txt");
//            File priseFile = new File("C:\\Users\\abuhu\\OneDrive\\Desktop\\final\\src\\main\\java\\com\\example\\demo\\configurations\\Prices.txt");
//            File doseTypeFile = new File("C:\\Users\\abuhu\\OneDrive\\Desktop\\final\\src\\main\\java\\com\\example\\demo\\configurations\\doseType.txt");
//            File companyFile = new File("C:\\Users\\abuhu\\OneDrive\\Desktop\\final\\src\\main\\java\\com\\example\\demo\\configurations\\company.txt");
//            Scanner brandNamesReader = new Scanner(brandNamesFile);
//            Scanner genericNamesReader = new Scanner(genericNamesFile);
//            Scanner priseReader = new Scanner(priseFile);
//            Scanner doseTypeReader = new Scanner(doseTypeFile);
//            Scanner companyReader = new Scanner(companyFile);
//            while (brandNamesReader.hasNextLine()) {
//                newDrug=new Drug();
//                newDrug.setDrugName(brandNamesReader.nextLine().trim().toUpperCase());
//                newDrug.setGenericNames(genericNamesReader.nextLine().trim().toUpperCase());
//                int price = priseReader.nextInt();
//                while(price > 200){
//                    price = price/10;
//                }
//                newDrug.setPrice(price);
//                newDrug.setDoseType(doseTypeReader.nextLine().trim().toUpperCase());
//                newDrug.setCompany(companyReader.nextLine().trim().toUpperCase());
//
//                drugsList.add(newDrug);
//            }
//            drugsRepository.saveAll(drugsList);
//        };
//    }
//}
