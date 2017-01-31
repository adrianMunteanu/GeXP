package demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import demo.frontModel.DropDown;
import demo.frontModel.GenderResult;
import demo.service.SparqlService;
import queries.Statistic;
import queries.StatisticResult;
import queries.WikidataParameter;

@RestController
public class QueryController {
	@Autowired
	SparqlService sparqlService;

	@RequestMapping("/statistics")
	public List<Statistic> getStatistics() {
		return sparqlService.getStatistics();
	}

	@RequestMapping("/dropDowns")
	public DropDown getDropDownValues(@RequestParam(value = "statistic") String statistic) {
		return sparqlService.getDropDownValues(statistic);
	}

	@RequestMapping("/statistic")
	public List<StatisticResult> getStatistic(@RequestParam(value = "statistic_name") String statistic,
			@RequestParam(value = "year") Integer year,
			@RequestParam(value = "country", required = false) String country) {
		return sparqlService.getStatistic(statistic, year, country);
	}

	@RequestMapping("/wikiDataStatistics")
	public List<Statistic> getWikiDataStatistics() {
		return sparqlService.getWikiDataStatistics();
	}

	@RequestMapping("/wikiDataCountries")
	public List<WikidataParameter> getWikiDataCountries() {
		return sparqlService.getWikidataCountries();
	}

	@RequestMapping("/wikiDataEyeColors")
	public List<WikidataParameter> getWikiDataColors() {
		return sparqlService.getWikidataEyeColors();
	}

	@RequestMapping("/wikiDataProfessions")
	public List<WikidataParameter> getWikiDataProfessions() {
		return sparqlService.getWikidataProfessions();
	}

	@RequestMapping("/wikiDataStatistic")
	public GenderResult getStatistic(@RequestParam(value = "statistic") String statistic,
			@RequestParam(value = "country", required = false) String country,
			@RequestParam(value = "eyeColor", required = false) String eyeColor,
			@RequestParam(value = "profession", required = false) String profession) {
		return sparqlService.getWikidataStatistic(statistic, country, eyeColor, profession);
	}
	
	@RequestMapping("/statistics/description")
	public Statistic getDescription(@RequestParam(value = "statistic")String statistic) {
		return sparqlService.getStatisticDescription(statistic);
	}
	

}
