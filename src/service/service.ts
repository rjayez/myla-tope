
const RULES_SEEN_KEY = "mylatope_rules_seen";
export function checkRulesAlreadySeen() : boolean {

    if (localStorage.getItem(RULES_SEEN_KEY)){
        return true;
    }
    localStorage.setItem(RULES_SEEN_KEY, "true");
    return false;
}
