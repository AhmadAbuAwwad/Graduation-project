
package com.example.demo.repositories;

import com.example.demo.models.Drug;
import com.example.demo.models.UserDrugs;
import com.example.demo.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UserDrugsRepository extends JpaRepository<UserDrugs, Integer> {
//    public List<UserDrugs> findUserDrugsByUserInfo(UserInfo userInfo);
    public List<UserDrugs> findUserDrugsByDrug(Drug drug);
    public List<UserDrugs> findByStatus(String status);
    public List<UserDrugs> findByUserReceiver(String email);
}