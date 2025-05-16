def calculate_profile_score():
    print("🎓 University Admission Profile Score Calculator")
    print(" *Disclaimer: This is a simplified calculator and does not guarantee admission to any university. Always check with the university for specific requirements.*")
    print(" *Many universities have different requirements such as test scores, personal statements, and interviews.*")
    print(" *This calculator will only help you estimate your profile score based on Olympiad achievements, academics, projects, and university acceptance rates.")
    print("\n *Please enter your details below:")

    # 1. Olympiad Achievements: International, National, Regional
    print("\nEnter your Olympiad achievements (if you have more than 10 awards, enter 10)")
    
    international_awards = int(input("Number of International Olympiad awards (out of 10): "))
    national_awards = int(input("Number of National Olympiad awards (out of 10): "))
    regional_awards = int(input("Number of Regional Olympiad awards (out of 10): "))
    Ielts = float(input("Enter your IELTS score (out of 9): "))
    Examination_Score = int(input("Enter your Test score (SAT, GCE, A-Levels): "))

    # Calculate raw scores for Olympiad categories based on number of awards (scale it to a 0-100 range)
    max_awards = 10
    international_score = (international_awards * 10)  # Scale awards to 100
    national_score = (national_awards * 10)  # Scale awards to 100
    regional_score = (regional_awards * 10)  # Scale awards to 100


    # Normalize Olympiad Score (average of all 3 categories)
    olympiad_score = (international_score + national_score + regional_score) / 3
    olympiad_score = round(olympiad_score, 2)

    # 2. Academics: GPA, standardized test scores (0-100 scale)
    print("\nEnter your Academics score (0 to 100 scale):")
    academics_score = float(input("Academics (e.g., GPA, SAT scores, etc.): "))

    # 3. Projects: Real-world coding, research, etc. (0-100 scale)
    print("\nEnter your Projects score (0 to 100 scale):")
    projects_score = float(input("Projects (Real-world coding, research, etc.): "))

    # Weights for each category (Academics, Olympiads, Projects)
    print("\nEnter the weights for each category for the university (should sum to 100):")
    weight_olympiads = float(input("Weight for Olympiad achievements (0 to 100): "))
    weight_academics = float(input("Weight for Academics (0 to 100): "))
    weight_projects = float(input("Weight for Projects (0 to 100): "))
    IELTS_requirements = float(input("IELTS requirement for selected University: "))
    Test_requirements = float(input("Test score requirement for selected University: "))
    # Check if the user has met the SAT requirements

    # Ensure weights sum to 1
    if weight_olympiads + weight_academics + weight_projects != 100:
        print("⚠️ Error: The weights do not sum to 100 Please check your inputs.")
        return

    # Calculate total weighted score
    total_score = (
        olympiad_score * (weight_olympiads/100) +
        academics_score * (weight_academics/100) +
        projects_score * (weight_projects/100) 
    )
    total_score = round(total_score, 2)

    # User inputs a university and its acceptance rate
    university_name = input("Enter the name of your university (e.g., NUS, Stanford, etc.): ")
    acceptance_rate = float(input(f"Enter the acceptance rate for {university_name} (0 to 100): "))
    actual_rate = (100 - acceptance_rate)
    

    if Examination_Score < Test_requirements:
        print(f"❌ Your SAT score of {Examination_Score} is below the requirement of {Test_requirements} for {university_name}.")
        print("Please consider retaking the SAT or improving your standardized test scores.")
        calculate_profile_score()
    # Check if the user has met the SAT requirements

    elif Examination_Score >= Test_requirements:
        print(f"Your SAT score of {Examination_Score} meets the requirement of {Test_requirements} for {university_name}.")
        total_score += 5
        print("You are eligible to apply for this university.")

    # Display the results
    if Ielts < IELTS_requirements:
        print(f"❌ Your IELTS score of {Ielts} is below the requirement of {IELTS_requirements} for {university_name} .")
        print("Please consider retaking the IELTS or improving your English proficiency.")

         # Add bonus points for meeting SAT requirements
    elif Ielts >= IELTS_requirements:
        print(f"✅ Your IELTS score of {Ielts} meets the requirement of {IELTS_requirements} for {university_name}.")
        print("You are eligible to apply for this university.")
        print("\n📊 Results:")
        print(f"Ielts Score (out of 10): {Ielts}")
        print(f"Olympiad Score (out of 100): {olympiad_score}")
        print(f"Academics Score (out of 100): {academics_score}")
        print(f"Projects Score (out of 100): {projects_score}")
        print(f"Total Weighted Score: {total_score:.2f}")
        print(f"Required score estimation : {actual_rate:.2f} %")
        
        # Normalize the total score to a percentage (0-100 scale)
        print(f"Normalized Total Score (Percentage): {total_score:.2f}%")

        # 4. University Acceptance Rates: User can input their university and acceptance rate
        print(f"\n the university acceptance rate (0 to 100 scale) is {acceptance_rate} %")

        # Calculate the likelihood of acceptance based on the total score and university acceptance rate
        if total_score >= actual_rate:
            print(f"✅ Congratulations! Based on your profile score of {total_score:.2f}%, you are likely to be accepted into {university_name}.")
        if total_score < actual_rate and total_score >= (actual_rate - 10):
            print(f"🤔 You are on the borderline! With a profile score of {total_score:.2f}%, you may have a chance of being accepted into {university_name}.")
        elif total_score < actual_rate:
            print(f"❌ Based on your profile score of {total_score:.2f}%, you may need to improve your profile to increase your chances of acceptance into {university_name}.")
            
    # Run the function
calculate_profile_score()
