const { query } = require('../config/db');

exports.generateSmartItinerary = async ({ budget, days, startLocation, interests }) => {
  const numDays = parseInt(days) || 3;
  const totalBudget = parseFloat(budget) || 5000;
  const userInterests = Array.isArray(interests) && interests.length > 0 ? interests : ['waterfall', 'wildlife', 'temple', 'adventure'];

  // Fetch all destinations matching interests or fallback to top rated
  const [allDests] = await query('SELECT * FROM destinations ORDER BY avg_rating DESC');

  let selectedDests = allDests.filter(d => userInterests.includes(d.category));
  if (selectedDests.length < numDays) {
    selectedDests = allDests; // Fallback to all if category subset is small
  }

  // Budget breakdown algorithm
  const estimatedStayCost = Math.round(totalBudget * 0.40);
  const estimatedFoodCost = Math.round(totalBudget * 0.25);
  const estimatedTransportCost = Math.round(totalBudget * 0.20);
  const estimatedEntryCost = Math.round(totalBudget * 0.10);
  const reserveFund = Math.round(totalBudget * 0.05);

  // Group into day-by-day itinerary (max 2 attractions per day)
  const itinerary = [];
  let destIdx = 0;

  for (let d = 1; d <= numDays; d++) {
    const dayAttractions = [];
    const count = Math.min(2, selectedDests.length - destIdx);

    for (let c = 0; c < count; c++) {
      if (destIdx < selectedDests.length) {
        dayAttractions.push(selectedDests[destIdx]);
        destIdx++;
      }
    }

    // If ran out of unique, wrap around
    if (dayAttractions.length === 0 && allDests.length > 0) {
      dayAttractions.push(allDests[(d - 1) % allDests.length]);
    }

    const morningActivity = dayAttractions[0] 
      ? `Visit ${dayAttractions[0].title} (${dayAttractions[0].district}) - Enjoy scenic views and local photography.`
      : 'Morning local sightseeing & cultural walk.';

    const afternoonActivity = dayAttractions[1]
      ? `Explore ${dayAttractions[1].title} - Try authentic local dish Dhuska & Rugra nearby.`
      : 'Relax at riverside cafe & try local tribal delicacies.';

    const eveningActivity = 'Evening traditional tribal handicraft shopping & cultural music performance.';

    itinerary.push({
      day: d,
      theme: `Day ${d}: ${dayAttractions[0]?.category.toUpperCase() || 'EXPLORATION'} & NATURE DISCOVERY`,
      attractions: dayAttractions,
      morning: morningActivity,
      afternoon: afternoonActivity,
      evening: eveningActivity,
      estimatedDayExpense: Math.round(totalBudget / numDays)
    });
  }

  // Weather & Seasonal Packing suggestions
  const currentMonth = new Date().getMonth() + 1; // 1 to 12
  let season = 'Winter';
  let packingSuggestions = ['Comfortable walking/hiking shoes', 'Camera with extra battery', 'Refillable water bottle', 'Local currency cash'];

  if (currentMonth >= 6 && currentMonth <= 9) {
    season = 'Monsoon';
    packingSuggestions.push('Waterproof raincoat/umbrella', 'Quick-dry outdoor clothing', 'Mosquito repellent cream', 'Waterproof phone pouch');
  } else if (currentMonth >= 10 || currentMonth <= 2) {
    season = 'Winter (Best Time)';
    packingSuggestions.push('Light jacket/woollen sweater for evening', 'Sunscreen & sunglasses', 'Moisturizer', 'Trekking poles for waterfalls');
  } else {
    season = 'Summer';
    packingSuggestions.push('Breathable cotton clothing', 'Electrolyte drinks / ORS', 'Wide-brim hat', 'Sunscreen SPF 50');
  }

  return {
    summary: {
      totalDays: numDays,
      startLocation: startLocation || 'Ranchi',
      totalBudget,
      season,
      budgetBreakdown: {
        accommodation: estimatedStayCost,
        foodAndDining: estimatedFoodCost,
        localTransport: estimatedTransportCost,
        entryFees: estimatedEntryCost,
        contingencyReserve: reserveFund
      }
    },
    itinerary,
    packingSuggestions,
    routeHighlights: `Recommended Starting Route: Begin from ${startLocation || 'Ranchi'}, take the Ranchi-Purulia Expressway towards Hundru/Jonha Falls, then head to Patratu Valley for scenic sunset.`
  };
};
