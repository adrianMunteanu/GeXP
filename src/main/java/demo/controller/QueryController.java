package demo.controller;

import java.util.List;

import org.junit.runners.Parameterized.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import demo.frontModel.DropDown;
import demo.service.SparqlService;
import queries.StatisticResult;

@RestController
public class QueryController {
	@Autowired
	SparqlService sparqlService;

	@RequestMapping("/statistics")
	public List<String> getStatistics() {
		return sparqlService.getStatistics();
		// return null;
	}

	@RequestMapping("/dropDowns")
	public DropDown getDropDownValues(@RequestParam(value = "statistic") String statistic) {
		return sparqlService.getDropDownValues(statistic);
	}

	@RequestMapping("/statistic")
	public List<StatisticResult> getStatistic(@RequestParam(value = "statistic") String statistic,
			@RequestParam(value = "year") Integer year,
			@RequestParam(value = "country", required = false) String country) {
		return sparqlService.getStatistic(statistic, year, country);
	}
}
