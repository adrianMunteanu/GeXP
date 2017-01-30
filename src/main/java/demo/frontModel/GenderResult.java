package demo.frontModel;

import java.util.List;

import queries.SingleGenderStatisticResult;

public class GenderResult {

	private List<SingleGenderStatisticResult> maleResults;
	private List<SingleGenderStatisticResult> femaleResults;

	public List<SingleGenderStatisticResult> getMaleResults() {
		return maleResults;
	}

	public void setMaleResults(List<SingleGenderStatisticResult> maleResults) {
		this.maleResults = maleResults;
	}

	public List<SingleGenderStatisticResult> getFemaleResults() {
		return femaleResults;
	}

	public void setFemaleResults(List<SingleGenderStatisticResult> femaleResults) {
		this.femaleResults = femaleResults;
	}

}
