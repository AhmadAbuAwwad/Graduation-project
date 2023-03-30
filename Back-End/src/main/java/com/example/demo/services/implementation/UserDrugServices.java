package com.example.demo.services.implementation;

import com.example.demo.controller.requests.UserDrugAddUpdateRequest;
import com.example.demo.controller.requests.UserUpdateByIdRequest;
import com.example.demo.exception.MedicineNotFoundException;
import com.example.demo.models.Drug;
import com.example.demo.models.UserDrugs;
import com.example.demo.models.UserInfo;
import com.example.demo.repositories.DrugsRepository;
import com.example.demo.repositories.UserDrugsRepository;
import com.example.demo.repositories.UserInformationRepository;
import com.example.demo.services.UserDrugsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserDrugServices implements UserDrugsService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private UserDrugsRepository userDrugsRepository;
    @Autowired
    private UserInformationRepository userInformationRepository;
    @Autowired
    private DrugsRepository drugsRepository;


    @Override
    public Optional<UserDrugs> addDrugToUser(UserDrugAddUpdateRequest userDrugAddUpdateRequest) {

        UserDrugs newUserDrug = new UserDrugs();

        Optional<Drug> drug = drugsRepository.findFirstByDrugNameAndDoseTypeAndCompanyAndGenericNames(
                userDrugAddUpdateRequest.getDrug().getDrugName(), userDrugAddUpdateRequest.getDrug().getDoseType(),
                userDrugAddUpdateRequest.getDrug().getCompany(), userDrugAddUpdateRequest.getDrug().getGenericNames());

        Optional<UserInfo> user = userInformationRepository.findUserInfoByEmail(userDrugAddUpdateRequest.getEmail());

        if (user.isPresent()) {
            newUserDrug.setUserDonor(user.get());
            newUserDrug.setExpirationDate(userDrugAddUpdateRequest.getExpirationDate());
            newUserDrug.setProductionDate(userDrugAddUpdateRequest.getProductionDate());
            newUserDrug.setStatus("Pending");   // Pending
            if (drug.isPresent())
                newUserDrug.setDrug(drug.get());
            else {
                Drug newDrug = new Drug();
                newDrug.setDrugName(userDrugAddUpdateRequest.getDrug().getDrugName());
                newDrug.setGenericNames(userDrugAddUpdateRequest.getDrug().getGenericNames());
                newDrug.setCompany(userDrugAddUpdateRequest.getDrug().getCompany());
                newDrug.setDoseType(userDrugAddUpdateRequest.getDrug().getDoseType());
                drugsRepository.save(newDrug);
                Optional<Drug> drugOptional = drugsRepository.findFirstByDrugNameAndDoseTypeAndCompanyAndGenericNames(
                        newDrug.getDrugName(), newDrug.getDoseType(),
                        newDrug.getCompany(), newDrug.getGenericNames());
                if (drugOptional.isPresent())
                    newUserDrug.setDrug(drugOptional.get());
            }
            userDrugsRepository.saveAndFlush(newUserDrug);
            return Optional.of(newUserDrug);
        }
        return Optional.empty();
    }

    @Override
    public Optional<UserDrugs> approvePostByManger(int id, boolean bool) {
        UserDrugs newUserDrug = new UserDrugs();
        Optional<UserDrugs> foundRequest = userDrugsRepository.findById(id);

        if (foundRequest.isPresent()) {
            newUserDrug.setId(foundRequest.get().getId());
            newUserDrug.setDrug(foundRequest.get().getDrug());
            newUserDrug.setUserDonor(foundRequest.get().getUserDonor());
            newUserDrug.setExpirationDate(foundRequest.get().getExpirationDate());
            newUserDrug.setProductionDate(foundRequest.get().getProductionDate());
            if (bool)
                newUserDrug.setStatus("Approved");   // Approve
            else
                userDrugsRepository.deleteById(id);   // Reject and Delete
            userDrugsRepository.saveAndFlush(newUserDrug);
            return Optional.of(newUserDrug);
        }
        return Optional.empty();
    }

    @Override
    public Optional<UserDrugs> updateDrugToUserById(UserUpdateByIdRequest userUpdateByIdRequest) {
        Optional<UserDrugs> userDrugs = userDrugsRepository.findById(userUpdateByIdRequest.getId());

        if (userDrugs.isPresent()) {
            UserDrugs userDrug = userDrugs.get();
            if (userUpdateByIdRequest.getExpirationDate() != null)
                userDrug.setExpirationDate(userUpdateByIdRequest.getExpirationDate());
            if (userUpdateByIdRequest.getProductionDate() != null)
                userDrug.setProductionDate(userUpdateByIdRequest.getProductionDate());
            if (userUpdateByIdRequest.getStatus() != null) {
                if (userUpdateByIdRequest.getStatus().equals("Approved") || userUpdateByIdRequest.getStatus().equals("Pending"))
                    userDrug.setStatus(userUpdateByIdRequest.getStatus());
                else {
                    userDrugsRepository.deleteById(userUpdateByIdRequest.getId());
                    return Optional.empty();
                }
            }
            userDrugsRepository.save(userDrug);
            return Optional.of(userDrug);
        }
        return Optional.empty();
    }

    @Override
    public List<UserDrugs> getAllUsersDrugs() {
        return userDrugsRepository.findAll();
    }

    @Override
    public Optional<UserDrugs> getById(int id) {
        if (userDrugsRepository.findById(id).isPresent())
            return userDrugsRepository.findById(id);
        return Optional.empty();
    }

    @Override
    public List<UserDrugs> getAllApprovedUsersDrugs() {
        List<UserDrugs> userDrugs = new ArrayList<>();
        for (UserDrugs userDrug : userDrugsRepository.findByStatus("Approved")) {
            if (userDrug.getUserReceiver() == null)
                userDrugs.add(userDrug);
        }
        return userDrugs;
    }

    @Override
    public List<UserDrugs> getHistoryOfDonation(String email) {
        List<UserDrugs> userDrugs = new ArrayList<>();
        for (UserDrugs userDrug : userInformationRepository.findUserInfoByEmail(email).get().getUserDrugsList()) {
            if (userDrug.getUserReceiver() != null)
                userDrugs.add(userDrug);
        }
        return userDrugs;
    }

    @Override
    public List<Double> getHistoryCount() {
        List<Double> values = new ArrayList<>();
        List<UserDrugs> donations = userDrugsRepository.findAll();
        double sum = 0;
        int number = 0;
        for (UserDrugs userDrug : donations) {
            if (userDrug.getUserReceiver() != null){
                sum += userDrug.getDrug().getPrice();
                number++;
            }
        }
        values.add(sum);
        values.add((double) number);

        return values;
    }

    @Override
    public Optional<UserDrugs> addReceiverForMedicine(int id, String email) {
        UserDrugs userDrugs = userDrugsRepository.findById(id).get();
        if (!userDrugs.getStatus().equals("Approved"))
            throw new MedicineNotFoundException("Medicine Post was not found");
        userDrugs.setUserReceiver(email);
        userDrugsRepository.save(userDrugs);
        sendSimpleEmail(userDrugs.getUserDonor().getEmail(), "Donation Request", "Hi Mr."+userDrugs.getUserDonor().getFirstName()
                + "\nWe are notifying you that someone is trying to get a medicine donation from the posted medicine on our website\n" +
                "The Person email how is trying to get the medicine: " + userDrugs.getUserReceiver() + "\n"
                + "The Medicine is: " + userDrugs.getDrug().getGenericNames() + " which you has posted it recently");


        sendSimpleEmail(userDrugs.getUserReceiver(), "Donation Request", "We are notifying you that you are trying " +
                "to get a medicine donation from the posted medicine on our website\n"
                + "The Medicine is: " + userDrugs.getDrug().getGenericNames() + " which you trying to get\n" +
                "Please contact the person with email: " + userDrugs.getUserDonor().getEmail());

        return userDrugsRepository.findById(id);
    }

    @Override
    public List<UserDrugs> getAllPendingUsersDrugs() {
        List<UserDrugs> userDrugs = new ArrayList<>();
        for (UserDrugs userDrug : userDrugsRepository.findByStatus("Pending")) {
            if (userDrug.getUserReceiver() == null)
                userDrugs.add(userDrug);
        }
        return userDrugs;
    }

    @Override
    public List<UserDrugs> getAllReceivedMedicineByUser(String email) {
        return userDrugsRepository.findByUserReceiver(email);
    }

    @Override
    public List<UserDrugs> getAllReceivedMedicine() {
        List<UserDrugs> userDrugs = new ArrayList<>();
        for (UserDrugs userDrug : userDrugsRepository.findAll()) {
            if (userDrug.getUserReceiver() != null)
                userDrugs.add(userDrug);
        }
        return userDrugs;
//        return userDrugsRepository.findAllByUserReceiverNotNull();
    }


    public void sendSimpleEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("medicinedonationwebsite@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);
        mailSender.send(message);
        System.out.println("Mail sent successfully to " + toEmail);
    }


//    @Override
//    public void deleteDrugFromUser(UserDrugDeleteRequest userDrugDeleteRequest) {
//        List<Drug> drug = drugsRepository.findByDrugName(userDrugDeleteRequest.getDrugName());
//        Optional<UserInfo> user = userInformationRepository.findUserInfoByEmail(userDrugDeleteRequest.getEmail());
//
//
//        if(!drug.isEmpty() && user.isPresent()){
//            UserInfo userInfo = user.get();
//            Drug drug1 = drug.get(0);
//            List<UserDrugs> drugList = user.get().getUserDrugsList();
//            List<UserDrugs> usersList = drug.get(0).getDrugUsersList();
//            List<UserDrugs> userDrugsList = userDrugsRepository.findUserDrugsByUserInfo(userInfo);
//            if(!userDrugsList.isEmpty()) {
//                UserDrugs userDrugs = userDrugsList.get(userDrugsList.size() - 1);
//                drugList.remove(userDrugs);
//                usersList.remove(userDrugs);
//                userInfo.setUserDrugsList(drugList);
//                drug1.setDrugUsersList(usersList);
//                userDrugsRepository.deleteById(userDrugs.getId());
//                userInformationRepository.save(userInfo);
//                drugsRepository.save(drug1);
//            }
//        }
//    }
//    @Override
//    public void deleteDrugKindFromUser(UserDrugDeleteRequest userDrugDeleteRequest) {
//        List<Drug> drug = drugsRepository.findByDrugName(userDrugDeleteRequest.getDrugName());
//        Optional<UserInfo> user = userInformationRepository.findUserInfoByEmail(userDrugDeleteRequest.getEmail());
//
//        if(!drug.isEmpty() && user.isPresent()) {
//            UserInfo userInfo = user.get();
//            Drug drug1 = drug.get(0);
//            List<UserDrugs> drugList = user.get().getUserDrugsList();
//            List<UserDrugs> usersList = drug.get(0).getDrugUsersList();
//            List<UserDrugs> userDrugsList = userDrugsRepository.findUserDrugsByUserInfo(userInfo);
//            for(UserDrugs userDrugs : userDrugsList){
//                drugList.remove(userDrugs);
//                usersList.remove(userDrugs);
//                userInfo.setUserDrugsList(drugList);
//                drug1.setDrugUsersList(usersList);
//                userDrugsRepository.deleteById(userDrugs.getId());
//                userInformationRepository.save(userInfo);
//                drugsRepository.save(drug1);
//            }
//        }
//    }

//    @Override
//    public void deleteDrugFromUserById(int id) {
//        userDrugsRepository.deleteById(id);
//    }
//    @Override
//    public Optional<UserDrugs> updateDrugToUser(UserDrugAddUpdateRequest userDrugAddUpdateRequest) {
//        List<Drug> drug = drugsRepository.findByDrugName(userDrugAddUpdateRequest.getDrugName());
//        Optional<UserInfo> user = userInformationRepository.findUserInfoByEmail(userDrugAddUpdateRequest.getEmail());
//
//        if(!drug.isEmpty() && user.isPresent()) {
//            List<UserDrugs> userDrugsList = userDrugsRepository.findUserDrugsByUserInfo(user.get());
//            if(!userDrugsList.isEmpty()) {
//                UserDrugs userDrug = userDrugsList.get(userDrugsList.size() - 1);
//                userDrug.setExpirationDate(userDrugAddUpdateRequest.getExpirationDate());
//                userDrug.setProductionDate(userDrugAddUpdateRequest.getProductionDate());
//                userDrug.setStatus("Pending");
//                userDrugsRepository.save(userDrug);
//
//                return Optional.of(userDrug);
//            }
//        }
//        return null;
//    }

}
