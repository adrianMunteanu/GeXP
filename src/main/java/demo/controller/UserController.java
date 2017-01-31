package demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import demo.beans.User;
import demo.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserRepository userRepository;
	
	@RequestMapping(method = RequestMethod.POST)
	public void addPerson(User user){
		userRepository.save(user);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public String test(){
		User user = new User();
		user.setPassword("asdasd");
		user.setUsername("Iasmina");
		user.setEnabled(1);
		userRepository.save(user);
		return "saved";
	}
	
}
