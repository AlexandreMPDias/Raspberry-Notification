import Gpio from "../../services/gpio";
import DateService from "../../services/date";
import Axios from "axios";

class PendingReviewObserverUtils {
	protected led = Gpio.led.pendingReview;

	protected lastHandle: Date = DateService.now();
	protected blinkingFrequency: number = 1000;
	protected blinkingEnable: boolean = false;

	protected shouldBlink = async (): Promise<boolean> => {
		const { open } = await this.countPending();

		return open > 0;
	};

	protected updateBlink = () => {
		if (this.blinkingEnable) {
			this.led.blink(this.blinkingFrequency);
		}
	};

	protected countPending = async (): Promise<{ open: number }> => {
		const response = await Axios.get(
			"https://github.com/pulls/review-requested",
			{
				headers: {
					Cookie:
						"_octo=GH1.1.28520041.1602270318; _ga=GA1.2.1894477572.1602270320; tz=America%2FSao_Paulo; _device_id=f6fbe76c517b7de4dd9c081c2f0cce96; user_session=gHr4xINQPOWSo5X8nahBWyHPLfnx7QbUvCZIsq8tqbbdRlFT; __Host-user_session_same_site=gHr4xINQPOWSo5X8nahBWyHPLfnx7QbUvCZIsq8tqbbdRlFT; tz=America%2FSao_Paulo; logged_in=yes; dotcom_user=AlexandreMPDias; has_recent_activity=1; _gh_sess=VdV9YoTcTuYzzGBlk1yvACPuwhO0z3Wx%2BTJ91DuDTKHSoHw3bMM6spYzVHgJsMJ%2Bm5MoWg7uxAzrXFqkRkEFvhE%2Ft%2Fig1OxWZKuVix4mnlsllCDIeEaYpOnlyoa6ElksWmdRWO6gS9JtyO09fGkEnXLFhjderMuqvoZ%2F%2BKfZZ%2FapLySyFt23uJMdMPKmdwQP060CCyPjfkr7aNw7JmSY%2FR%2FT%2Fx8mMmfjgf5ZM%2Bz%2FFDQy0SwBYKtSNZx6YgodJgjOowUBeaqn%2B612Fu4vcjFKwGo7lxlr0zqLt%2BzepENImYpynE1X4X61KcrGkzuiZ0kV4ZKTDyVPM7wf4ukzafaUBUE0i%2BJGofJKM3I3T6NJ7Tln9%2BsDcWj69IaNAZAuZZbwoQ2P4l2VCGOK%2B5wi75QjwqWjQnjGN5S31BuSGSUilk8wpQxn6yTaplqtsnzePJGs5DSpNeaucdRst%2B1DFP0CJzEu9MKVGgy2hF7Bg4WcSJeZUl9l9EHvWOSaf3dD8MD9CyGPPt8Gir5P%2FX4BZBIIZslEWz91v82aXklGss8jTk8hmHkFR5I%2FP%2BGLGGpEvPzFg%2BSieO3bhItNvPyk97IQn%2B6Et%2FGaY8e9%2FXofzkcNBmmeYlavlGO4NgXkglB8CqNWts3BEbzYFcgXnmRFDaHx%2BRq5Tr0Bi0m3hG%2BpE18R9bGHycgLlRUYxle7PHWFgYqbBZ9A98PT21RTmje4GvFPx2%2FeRA2Umdag%2Fkk%2FpfGfvCugF%2FEmauvPuJvsqlUG47%2BKV0AAig%2FPfQLTEicbEuV9ugi73%2BRj5B0h2eQlDTnKpYXEl0o8AvDtzWs9K7J9DyYSUVSHy96Q16xkWkNj%2B2TDGJDE4E%2BFIUi4kurd%2FBWoXlpqFFuEb3ofzbFvsWsGEeczOLMgQKPsL95EI580WZ5xYnUNpPbMwhgGoJ4tLdJK7BUPZpHnKgxzmE4lEZLDn9bIP5lXHxS1MB0kDaYAgGFHRPMZSVmqe8ZuKhT22h4p86vLDedYVfA10ZZ7NvqbWQ7wKM3L2reP6AFQflFz7GBEqW27aCFOizaz2QAyaVdv2DblWCgGUVVb%2F18FTt7FmU1AuUQda8v5E9GDz4WMQjQzhUV3TnDyUU9fLFCFEd8lt1le8YNYvAWQfDuSrDXhX5is46lBisq1tfa03%2Fgv6Kdq03Uyc8v%2FkrHK--SVU2wm5LKQVuEEEI--hNiZx1X%2BexI63ziYCGd83Q%3D%3D",
				},
			}
		);

		const data: string = response.data;

		const content = data
			.split("\n")
			.filter((line) => line.match(/\d+\sOpen/))
			.join("_");

		const open = Number(content.replace(/.*(\d+)\sOpen.*/, "$1"));

		return { open };
	};
}

export default PendingReviewObserverUtils;
