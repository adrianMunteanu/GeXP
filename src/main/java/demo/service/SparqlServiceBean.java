package demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import demo.frontModel.DropDown;
import demo.frontModel.GenderResult;
import ontology.StatisticOntology;
import queries.QueriesApi;
import queries.StatisticResult;
import queries.WikidataParameter;

@Service
public class SparqlServiceBean implements SparqlService {

	StatisticOntology owl = new StatisticOntology();
	QueriesApi query = new QueriesApi();
	boolean init;
	List<String> categories;

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

	public List<String> getCountries() {

		if (init) {
			// lista celor 3 mari categorii
			ArrayList<String> categories = query.getMainCategories();
			for (String category : categories) {
				System.out.println(category);
				// pentru fiecare categorie avem statisticile disponibile
				ArrayList<String> subcategory = query.getSubcategoriesOf(category);
				for (String statistic : subcategory) {
					// fiecare statistica are rezultate numai pt anumiti ani si
					// anumite tari
					System.out.println("    " + statistic);
					ArrayList<String> countries = query.getAvailableCountries(statistic);
					for (String country : countries) {
						System.out.print("        " + country + " / ");
					}
					System.out.println();
					ArrayList<Integer> years = query.getAvailableYears(statistic);
					for (int year : years) {
						System.out.print("        " + year + " / ");
					}
					System.out.println();

				}
			}

			ArrayList<String> subcategorii = query.getSubcategoriesOf("Living_standards");
			return query.getAvailableCountries("Unemployed_rate");
		}
		return null;
	}

	public List<String> getStatistics() {

		if (init && categories == null) {
			categories = new ArrayList<>();
			ArrayList<String> mainCategories = query.getMainCategories();
			for (String category : mainCategories) {
				ArrayList<String> subcategories = query.getSubcategoriesOf(category);
				categories.addAll(subcategories);
			}
			return categories;
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
	public List<String> getWikiDataStatistics() {
		return query.getWikidataCategories();
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

//		switch (statisic) {
//		case value:
//
//			break;
//
//		default:
//			break;
//		}

		return null;
	}

}
