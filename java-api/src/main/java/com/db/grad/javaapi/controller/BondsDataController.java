package com.db.grad.javaapi.controller;

import com.db.grad.javaapi.model.BondsData;
import com.db.grad.javaapi.service.BondsDataService;
import com.db.grad.javaapi.service.IBondsDataService;
import com.db.grad.javaapi.service.IUserService;
import com.db.grad.javaapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/bondsdata")
@CrossOrigin(origins = "http://localhost:3000")
public class BondsDataController {
    private BondsDataService dataService;
    private UserService userService;

    @Autowired
    public BondsDataController(BondsDataService bondsDataService, UserService userService) {
        this.dataService = bondsDataService;
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<BondsData> getAllBondsData() {
        return dataService.getAll();
    }

    @GetMapping("/buys")
    public List<BondsData> getAllBuys() {
        return dataService.getAllBuys();
    }

    @GetMapping("/sells")
    public List<BondsData> getAllSells() {
        return dataService.getAllSells();
    }

    @GetMapping("/all/{date}")
    public List<BondsData> getByMaturityDate(@RequestParam @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {
        return dataService.getByMaturityDate(date);
    }

    @GetMapping("/all/bookName/{bookName}")
    public List<BondsData> getByBookName(@PathVariable String bookName) {
        return dataService.getByBookName(bookName);
    }
    @GetMapping("/all/ISIN/{isin}")
    public List<BondsData> getByIsin(@PathVariable String isin) {
        return dataService.getBondByISIN(isin);
    }

    @GetMapping("/all/bondHolder/{bondHolder}")
    public List<BondsData> getByBondHolder(@PathVariable String bondHolder) {
        return dataService.getByHolderName(bondHolder);
    }
    @GetMapping("/all/user/{firebaseUserId}")
    public List<BondsData> getForUser(@PathVariable String firebaseUserId, @RequestParam(required = false) @DateTimeFormat(pattern="yyyy-MM-dd") Date date) {
        int userId = userService.getByFirebaseUserId(firebaseUserId).getId();

        if(date != null) {
            return dataService.getForUser(userId, date);
        }

        return dataService.getForUser(userId);
    }
}
