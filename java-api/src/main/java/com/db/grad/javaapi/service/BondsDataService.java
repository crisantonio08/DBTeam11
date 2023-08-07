package com.db.grad.javaapi.service;

import com.db.grad.javaapi.model.BondsData;
import com.db.grad.javaapi.model.User;
import com.db.grad.javaapi.repository.BondsRepository;
import com.db.grad.javaapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BondsDataService implements IBondsDataService
{
    private final BondsRepository repository;
    private final UserRepository userRepository;

    @Autowired
    public BondsDataService(BondsRepository repository, UserRepository userRepository)
    {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @Override
    public List<BondsData> getAll() {
        return repository.findAll();
    }

    @Override
    public BondsData add(BondsData data) {
        return repository.save(data);
    }

    @Override
    public long getCount() {
        return repository.count();
    }

    @Override
    public boolean delete(int id) {
        if(repository.existsById(id))
        {
            repository.deleteById(id);
            return true;
        }

        return false;
    }

    @Override
    public BondsData getById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<BondsData> getByHolderName(String name) {
        return repository.findByHolderName(name);
    }

    @Override
    public BondsData update(BondsData data) {
        return repository.save(data);
    }

    @Override
    public List<BondsData> getAllBuys() {
        return repository.getBuys();
    }

    @Override
    public List<BondsData> getAllSells() {
        return repository.getSells();
    }

    @Override
    public List<BondsData> getByType(String type) {
        return repository.findByType(type);
    }

    @Override
    public List<BondsData> getByBookName(String bookName) {
        return repository.findByBookName(bookName);
    }

    @Override
    public List<BondsData> getByMaturityDate(Date date) {
        // Clear all time related information from the date
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        date = cal.getTime();

        return repository.findByMaturityDate(date);
    }

    @Override
    public List<BondsData> getBondByISIN(String isin) {
        return repository.findByIsin(isin);
    }

    @Transactional
    @Override
    public List<BondsData> getForUser(int userId) {
        return getUserBondsData(userId);
    }

    private List<BondsData> getUserBondsData(int userId) {
        List<BondsData> result = null;
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            List<BondsData> ret = new ArrayList<>();
            for (String book : user.getTradingBooks()) {
                ret.addAll(repository.findByBookName(book));
            }
            result = ret;
        }

        return result;
    }

    @Override
    public List<BondsData> getForUser(int userId, Date date) {
        List<BondsData> userData = getUserBondsData(userId);
        // Return all bonds where the maturity date is on the same numerical day as the given date
        return userData.stream().filter(bond -> {
            LocalDateTime maturityDate = bond.getBondMaturityDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            LocalDateTime givenDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
            return Duration.between(maturityDate, givenDate).toDays() == 0;
        }).collect(Collectors.toList());
    }
}
