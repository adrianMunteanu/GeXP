package demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import ontology.StatisticOntology;
import queries.QueriesApi;
import queries.StatisticResult;

@Service
public class SparqlServiceBean implements SparqlService {
	StatisticOntology owl = new StatisticOntology();

	public List<String> getCountries() {

		String OwlFilePath = "C:\\Adrian\\statisticsOntologyeeeee.owl";

		boolean created = owl.create();
		if (created) {
			owl.initialize();
			boolean saved = owl.save(OwlFilePath);
			if (saved) {
				System.out.println("\tontology saved");
			}
		}

		QueriesApi query = new QueriesApi();
		boolean init = query.initialize(OwlFilePath);

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

}
