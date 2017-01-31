package demo.service;

import java.util.List;

import demo.frontModel.DropDown;
import demo.frontModel.GenderResult;
import queries.Statistic;
import queries.StatisticResult;
import queries.WikidataParameter;

public interface SparqlService {

	public List<Statistic> getStatistics();

	public DropDown getDropDownValues(String statistic);

	public List<StatisticResult> getStatistic(String statistic, Integer year, String country);

	public List<Statistic> getWikiDataStatistics();

	public List<WikidataParameter> getWikidataCountries();

	public List<WikidataParameter> getWikidataEyeColors();

	public List<WikidataParameter> getWikidataProfessions();

	public GenderResult getWikidataStatistic(String statisic, String country, String eyeColor, String proffesion);
	
	public Statistic getStatisticDescription(String statistic);

}
