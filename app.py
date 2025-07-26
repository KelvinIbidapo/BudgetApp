def calculate_profit(purchase_price, current_price, shares_owned):
    profit = (current_price - purchase_price) * shares_owned
    return profit

# Example usage
profit = calculate_profit(100, 150, 10)
print(f"Profit: ${profit}")

def check_affordability(monthly_income, monthly_expenses, investment_goal):
    disposable_income = monthly_income - monthly_expenses
    if disposable_income >= investment_goal:
        return f"You can afford to invest ${investment_goal} per month."
    else:
        return f"Your investment goal exceeds your disposable income by ${investment_goal - disposable_income}."

# Example usage
message = check_affordability(5000, 4000, 800)
print(message)

def compound_interest(initial_investment, annual_rate, years, compounding_frequency=1):
    future_value = initial_investment * (1 + annual_rate / compounding_frequency) ** (compounding_frequency * years)
    return future_value

# Example usage
future_value = compound_interest(10000, 0.08, 20)
print(f"Future Value: ${future_value:.2f}")

def shares_to_buy(capital, share_price):
    shares = capital // share_price  # Use integer division for whole shares
    return shares

# Example usage
shares = shares_to_buy(5000, 150)
print(f"Shares you can buy: {shares}")
