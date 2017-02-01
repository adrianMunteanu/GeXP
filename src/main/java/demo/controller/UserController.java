package demo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
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
	public void addPerson(@RequestBody User user){
		userRepository.save(user);
		//session.setAttribute("user", user);
	}
	
//	@RequestMapping(method = RequestMethod.GET)
//	public void test(@RequestBody User user){
//		userRepository.save(user);
//	}
	
}
