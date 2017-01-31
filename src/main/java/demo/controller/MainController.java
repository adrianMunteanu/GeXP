package demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import demo.beans.User;
import demo.service.SparqlService;

@RestController
public class MainController {

	@Autowired
	SparqlService sparqlService;

	@RequestMapping("/rapam")
	public Map<String, Object> homes() {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("id", UUID.randomUUID().toString());
		model.put("content", "Hello World");
		return model;
	}

	@RequestMapping("/tesst")
	public String test() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String name = auth.getName(); // get logged in username
		return "sdsad";
	}

	@RequestMapping("/getUser")
	public User getUser() {

		User user = new User();
		user.setPassword("asdasdasd");
		user.setUsername("Adyzds");
		return user;
	}
}
