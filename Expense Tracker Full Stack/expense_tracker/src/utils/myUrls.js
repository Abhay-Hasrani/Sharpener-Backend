const myUrls = {};
myUrls.baseUrl = "http://localhost:4000";//"http://16.171.3.251:4000"

myUrls.authBaseUrl = myUrls.baseUrl + "/auth";
myUrls.signUpUrl = myUrls.authBaseUrl + "/signUp";
myUrls.logInUrl = myUrls.authBaseUrl + "/logIn";

myUrls.passwordBaseUrl = myUrls.baseUrl + "/password";
myUrls.forgotPasswordUrl = myUrls.passwordBaseUrl + "/forgotPassword";
myUrls.updatePasswordUrl = myUrls.passwordBaseUrl + "/updatePassword";


myUrls.expenseBaseUrl = myUrls.baseUrl + "/expense";//also send query parameter (/?pageNo=) with it 
myUrls.addExpenseUrl = myUrls.expenseBaseUrl + "/add-expense";
myUrls.deleteExpenseUrl = myUrls.expenseBaseUrl + "/delete-expense/";
myUrls.downloadExpenseUrl = myUrls.expenseBaseUrl + "/download-expense";
myUrls.allDownloadsExpenseUrl = myUrls.expenseBaseUrl + "/all-downloads-expenses";

myUrls.purchaseBaseUrl = myUrls.baseUrl + "/purchase";
myUrls.purchasePremiumUrl = myUrls.purchaseBaseUrl + "/premium";
myUrls.updateTransactionStatusUrl = myUrls.purchaseBaseUrl + "/updateTransactionStatus";

myUrls.premiumBaseUrl = myUrls.baseUrl + "/premium";
myUrls.leaderboardUrl = myUrls.premiumBaseUrl + "/leaderboard";

export default myUrls;
