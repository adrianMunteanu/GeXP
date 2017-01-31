package demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import demo.frontModel.DropDown;
import demo.frontModel.GenderResult;
import ontology.StatisticOntology;
import queries.QueriesApi;
import queries.SingleGenderStatisticResult;
import queries.Statistic;
import queries.StatisticResult;
import queries.WikidataParameter;

@Service
public class SparqlServiceBean implements SparqlService {

	StatisticOntology owl = new StatisticOntology();
	QueriesApi query = new QueriesApi();
	boolean init;
	{
		String OwlFilePath = "C:\\Adrian\\statisticsOntologyeeeee.owl";
		boolean created = owl.create();
		if (created) {
			owl.initialize();
			boolean saved = owl.save(OwlFilePath);
			if (saved) {
				System.out.println("\tontology saved");
			}
		}
		init = query.initialize(OwlFilePath);

	}

	public List<Statistic> getStatistics() {

		if (init) {
			List<Statistic> statistics = new ArrayList<>();
			ArrayList<String> mainCategories = query.getMainCategories();
			for (String category : mainCategories) {
				ArrayList<String> subcategories = query.getSubcategoriesOf(category);
				for(String subCategory : subcategories){
					statistics.add(query.getCategoryDetails(subCategory));
				}
			}
			return statistics;
		}
		return null;
	}

	@Override
	public DropDown getDropDownValues(String statistic) {
		DropDown dropDown = new DropDown();
		dropDown.setCountries(query.getAvailableCountries(statistic));
		dropDown.setYears(query.getAvailableYears(statistic));

		return dropDown;
	}

	@Override
	public List<StatisticResult> getStatistic(String statistic, Integer year, String country) {
		List<StatisticResult> statisticResults = new ArrayList<>();
		if (country == null || country.trim().isEmpty()) {
			return query.getStatisticResult(statistic, year);
		} else {
			statisticResults.add(query.getSingleStatisticResult(statistic, year, country));
			return statisticResults;
		}

	}

	@Override
	public List<Statistic> getWikiDataStatistics() {
		ArrayList<Statistic> statistics = new ArrayList<>();
		ArrayList<String> wikidataCategories = query.getWikidataCategories();
		for(String category : wikidataCategories){
			statistics.add(query.getWikidataCategoryDetail(category));
		}
		return statistics;
	}

	@Override
	public List<WikidataParameter> getWikidataCountries() {
		return query.getWikidataCountries();
	}

	@Override
	public List<WikidataParameter> getWikidataEyeColors() {
		return query.getWikidataEyeColors();
	}

	@Override
	public List<WikidataParameter> getWikidataProfessions() {
		return query.getWikidataProfessions();
	}

	@Override
	public GenderResult getWikidataStatistic(String statisic, String country, String eyeColor, String proffesion) {
		GenderResult genderResult = new GenderResult();
		
		switch (statisic) {
		case "City rulers":
			genderResult.setFemaleResults(fromStringToGenderResult(query.getWikidataCountriesByRulerGender(QueriesApi.WIKIDATA_FEMALE)));
			genderResult.setMaleResults(fromStringToGenderResult(query.getWikidataCountriesByRulerGender(QueriesApi.WIKIDATA_MALE)));
			break;
		case "WikidataParameter rulers":
			genderResult.setFemaleResults(query.getWikidataCountriesByCelebrities(QueriesApi.WIKIDATA_FEMALE));
			genderResult.setMaleResults(query.getWikidataCountriesByCelebrities(QueriesApi.WIKIDATA_MALE));
			break;
		case "Oscar winners":
			genderResult.setFemaleResults(query.getWikidataCountriesByOscarWinners(QueriesApi.WIKIDATA_FEMALE));
			genderResult.setMaleResults(query.getWikidataCountriesByOscarWinners(QueriesApi.WIKIDATA_MALE));
			break;
		case "Birth place":
			genderResult.setFemaleResults(query.getWikidataCountriesByCities(QueriesApi.WIKIDATA_FEMALE));
			genderResult.setMaleResults(query.getWikidataCountriesByCities(QueriesApi.WIKIDATA_MALE));
			break;
		case "Eye color particularity":
			genderResult.setFemaleResults(query.getWikidataCountriesByEyeColor(QueriesApi.WIKIDATA_FEMALE, eyeColor));
			genderResult.setMaleResults(query.getWikidataCountriesByEyeColor(QueriesApi.WIKIDATA_MALE, eyeColor));
			break;
		case "Working area":
			genderResult.setFemaleResults(query.getWikidataCountriesByWorkField(QueriesApi.WIKIDATA_FEMALE, proffesion));
			genderResult.setMaleResults(query.getWikidataCountriesByWorkField(QueriesApi.WIKIDATA_MALE, proffesion));
			break;

		default:
			break;
		}

		return genderResult;
	}

	private List<SingleGenderStatisticResult> fromStringToGenderResult(
			ArrayList<String> wikidataCountriesByRulerGender) {
		List<SingleGenderStatisticResult> results = new ArrayList<>();
		SingleGenderStatisticResult result;
		for(String string : wikidataCountriesByRulerGender){
			results.add(new SingleGenderStatisticResult(string, 0, ""));
		}
		return results;
	}

	@Override
	public Statistic getStatisticDescription(String statistic) {
		Statistic categoryDetails;
		categoryDetails = query.getCategoryDetails(statistic);
		if(categoryDetails == null ){
			categoryDetails = query.getWikidataCategoryDetail(statistic);
		}
		return categoryDetails;
		
//		StatisticOntology.addData(filePath, yearData, countryData, maleData, femaleData, stat_identifier, stat_type);
	}
	
	

}
