package demo.comparator;

import java.util.Comparator;

import queries.SingleGenderStatisticResult;

public class StratisticComparator implements Comparator {

	@Override
	public int compare(Object o1, Object o2) {
		SingleGenderStatisticResult s1 = (SingleGenderStatisticResult)o1;
		SingleGenderStatisticResult s2 = (SingleGenderStatisticResult)o2;
		
		
		return s1.getCountry().compareTo(s2.getCountry());
	}

}
