package demo.repository;

import org.springframework.data.repository.CrudRepository;

import demo.beans.User;

public interface UserRepository extends CrudRepository<User, Long>{

}
