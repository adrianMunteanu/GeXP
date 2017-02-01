package demo.controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
	
	@RequestMapping(method = RequestMethod.GET)
	public String getUser(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		 String name = auth.getName();
		 return "\"" + name +  "\"" ;
	}
	
	@RequestMapping(value="/logout", method = RequestMethod.POST)
	public void logout(HttpServletRequest request){
		try {
			request.logout();
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			System.out.println(auth);
			// String name = auth.getName();
		} catch (ServletException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	
}
