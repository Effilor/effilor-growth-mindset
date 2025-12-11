import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';

// Logo URL - will be loaded from the public folder
const LOGO_URL = '/effilor-logo.jpg';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userData, setUserData] = useState({ name: '', email: '', company: '' });

  const questions = [
    // Pillar 1: Beliefs About Potential
    {
      id: 1,
      pillar: 'Beliefs About Potential',
      text: "Our organization's view on employee capabilities is:",
      options: [
        { value: 1, label: "People have natural strengths that should be leveraged in their current roles" },
        { value: 2, label: "Core competencies are mostly fixed, but can be enhanced with targeted training" },
        { value: 3, label: "Capabilities can be significantly developed with the right opportunities and support" },
        { value: 4, label: "Almost any capability can be built if people are willing to invest effort and time" }
      ]
    },
    {
      id: 2,
      pillar: 'Beliefs About Potential',
      text: "Our organization believes that exceptional performance comes from:",
      options: [
        { value: 1, label: "Hiring people with the right natural talents and aptitudes" },
        { value: 2, label: "A combination of innate talent and learned skills (60/40 split)" },
        { value: 3, label: "Primarily from developed skills, discipline, and deliberate practice" },
        { value: 4, label: "Continuous learning and growth mindset regardless of starting point" }
      ]
    },
    {
      id: 3,
      pillar: 'Beliefs About Potential',
      text: "When we identify capability gaps in our teams, our approach is:",
      options: [
        { value: 1, label: "Reorganize or hire to bring in people who already have those capabilities" },
        { value: 2, label: "Provide training but maintain realistic expectations about improvement" },
        { value: 3, label: "Invest in development programs believing significant growth is possible" },
        { value: 4, label: "View gaps as exciting development opportunities with high confidence in transformation" }
      ]
    },
    {
      id: 4,
      pillar: 'Beliefs About Potential',
      text: "Our leadership communicates that employee potential is:",
      options: [
        { value: 1, label: "Largely determined by their background, education, and early career experiences" },
        { value: 2, label: "Somewhat flexible within the boundaries of their core strengths" },
        { value: 3, label: "Expandable through dedicated effort and the right support systems" },
        { value: 4, label: "Nearly unlimited when combined with commitment, coaching, and practice" }
      ]
    },
    // Pillar 2: Valuing Effort
    {
      id: 5,
      pillar: 'Valuing Effort',
      text: "When recognizing employee achievements, we emphasize:",
      options: [
        { value: 1, label: "Outcomes and results achieved" },
        { value: 2, label: "Skills and competencies demonstrated" },
        { value: 3, label: "Both results and the effort invested" },
        { value: 4, label: "Effort, learning, improvement, and perseverance above results" }
      ]
    },
    {
      id: 6,
      pillar: 'Valuing Effort',
      text: "In our organization, employees who consistently put in extra effort but don't immediately succeed:",
      options: [
        { value: 1, label: "Are viewed as less capable than naturally talented high performers" },
        { value: 2, label: "Are appreciated but may not advance as quickly as those with better results" },
        { value: 3, label: "Are recognized for their commitment and given continued opportunities" },
        { value: 4, label: "Are celebrated as role models and given high-visibility growth opportunities" }
      ]
    },
    {
      id: 7,
      pillar: 'Valuing Effort',
      text: "When setting goals and targets, we:",
      options: [
        { value: 1, label: "Set achievable targets within current team capabilities to ensure success" },
        { value: 2, label: "Set moderately challenging targets that require solid effort" },
        { value: 3, label: "Set ambitious targets that require substantial effort and new approaches" },
        { value: 4, label: "Set breakthrough goals that demand extraordinary effort and innovative thinking" }
      ]
    },
    {
      id: 8,
      pillar: 'Valuing Effort',
      text: "Our approach to persistence and 'trying hard' is:",
      options: [
        { value: 1, label: "Work smart, not hard - efficiency matters more than effort" },
        { value: 2, label: "Effort is valued but shouldn't come at the cost of work-life balance" },
        { value: 3, label: "We encourage sustained effort and view persistence as a key success factor" },
        { value: 4, label: "We celebrate grit and determination as core cultural values, even through setbacks" }
      ]
    },
    // Pillar 3: Thriving on Challenges
    {
      id: 9,
      pillar: 'Thriving on Challenges',
      text: "When filling challenging roles, we:",
      options: [
        { value: 1, label: "Only consider candidates who already possess 90%+ of required skills" },
        { value: 2, label: "Prefer proven talent with a strong track record in similar roles" },
        { value: 3, label: "Consider high-potential candidates who have 70-80% of required skills" },
        { value: 4, label: "Actively place talented individuals in stretch roles to accelerate their growth" }
      ]
    },
    {
      id: 10,
      pillar: 'Thriving on Challenges',
      text: "In our organization, the relationship between efficiency and innovation is:",
      options: [
        { value: 1, label: "Efficiency and productivity always take priority over experimentation" },
        { value: 2, label: "Innovation is encouraged, but not at the cost of current performance" },
        { value: 3, label: "We balance both, with dedicated time/resources for new ideas" },
        { value: 4, label: "We actively encourage experimentation even if it temporarily impacts efficiency" }
      ]
    },
    {
      id: 11,
      pillar: 'Thriving on Challenges',
      text: "Our approach to encouraging new ideas and experiments:",
      options: [
        { value: 1, label: "We support ideas only when success probability is high (>70%)" },
        { value: 2, label: "We're open to pilots if business cases show reasonable ROI potential" },
        { value: 3, label: "We encourage calculated experiments even with moderate uncertainty" },
        { value: 4, label: "We actively create safe spaces for bold experiments, expecting some failures" }
      ]
    },
    {
      id: 12,
      pillar: 'Thriving on Challenges',
      text: "When assigning important projects, we:",
      options: [
        { value: 1, label: "Choose proven performers to minimize risk" },
        { value: 2, label: "Prefer experienced people but consider risks carefully" },
        { value: 3, label: "Balance project success with opportunities for high-potential team members" },
        { value: 4, label: "View stretch assignments as essential for development, even with higher risk" }
      ]
    },
    // Pillar 4: Learning from Failures
    {
      id: 13,
      pillar: 'Learning from Failures',
      text: "When projects or initiatives don't succeed as planned, we typically:",
      options: [
        { value: 1, label: "Look for external factors and circumstances that caused the failure" },
        { value: 2, label: "Acknowledge both external factors and internal missteps" },
        { value: 3, label: "Focus primarily on what we could have done differently" },
        { value: 4, label: "Conduct deep retrospectives focused entirely on learning and growth" }
      ]
    },
    {
      id: 14,
      pillar: 'Learning from Failures',
      text: "Our organization's approach to failures and setbacks:",
      options: [
        { value: 1, label: "Failures are rarely discussed openly to avoid demotivating teams" },
        { value: 2, label: "Failures are acknowledged privately within teams" },
        { value: 3, label: "We discuss failures openly to extract lessons learned" },
        { value: 4, label: "We actively celebrate intelligent failures as vital learning moments" }
      ]
    },
    {
      id: 15,
      pillar: 'Learning from Failures',
      text: "Our culture around critical/developmental feedback:",
      options: [
        { value: 1, label: "We prefer positive reinforcement; critical feedback is rare" },
        { value: 2, label: "Critical feedback is given privately and carefully to avoid discouragement" },
        { value: 3, label: "We encourage balanced feedback including constructive criticism" },
        { value: 4, label: "We actively seek and normalize critical feedback as essential for growth" }
      ]
    },
    {
      id: 16,
      pillar: 'Learning from Failures',
      text: "In our organization, when someone takes a calculated risk and fails:",
      options: [
        { value: 1, label: "There are consequences; failure affects their reputation and future opportunities" },
        { value: 2, label: "It's noted but won't significantly impact their career if it's rare" },
        { value: 3, label: "It's accepted as part of growth if they demonstrate learning from it" },
        { value: 4, label: "They're respected for trying; intelligent failures enhance their credibility" }
      ]
    }
  ];

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentScreen('results');
    }
  };

  const calculateResults = () => {
    const pillarScores = {
      'Beliefs About Potential': 0,
      'Valuing Effort': 0,
      'Thriving on Challenges': 0,
      'Learning from Failures': 0
    };

    questions.forEach((question, index) => {
      const answer = answers[index] || 1;
      pillarScores[question.pillar] += answer;
    });

    const totalScore = Object.values(pillarScores).reduce((a, b) => a + b, 0);
    const percentageScore = Math.round((totalScore / 64) * 100);

    return {
      pillarScores,
      totalScore,
      percentageScore,
      level: getLevel(percentageScore)
    };
  };

  const getLevel = (score) => {
    if (score >= 80) return { name: 'Growth Champion', color: 'bg-green-500', textColor: 'text-green-700' };
    if (score >= 65) return { name: 'Growth-Oriented', color: 'bg-blue-500', textColor: 'text-blue-700' };
    if (score >= 50) return { name: 'Mixed Mindset', color: 'bg-yellow-500', textColor: 'text-yellow-700' };
    if (score >= 35) return { name: 'Predominantly Fixed', color: 'bg-orange-500', textColor: 'text-orange-700' };
    return { name: 'Fixed Dominant', color: 'bg-red-500', textColor: 'text-red-700' };
  };

  const getPillarLevel = (score) => {
    if (score >= 14) return { name: 'Strong', color: 'bg-green-100 text-green-800' };
    if (score >= 11) return { name: 'Developing', color: 'bg-blue-100 text-blue-800' };
    if (score >= 8) return { name: 'Emerging', color: 'bg-yellow-100 text-yellow-800' };
    return { name: 'Needs Focus', color: 'bg-red-100 text-red-800' };
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    const assessmentData = {
      name: userData.name,
      email: userData.email,
      company: userData.company,
      answers: answers,
      timestamp: new Date().toISOString()
    };

    console.log('Submitting assessment data:', assessmentData);

    try {
      const response = await fetch('/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assessmentData)
      });

      if (response.ok) {
        console.log('Assessment data sent successfully');
        setCurrentScreen('thankyou');
      } else {
        const error = await response.json();
        console.error('Failed to send:', error);
        alert('There was an issue submitting your assessment. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('There was an issue submitting your assessment. Please try again.');
    }
  };

  const results = currentScreen === 'results' || currentScreen === 'email' || currentScreen === 'thankyou' ? calculateResults() : null;

  const radarData = results ? [
    {
      pillar: 'Beliefs',
      score: (results.pillarScores['Beliefs About Potential'] / 16) * 100
    },
    {
      pillar: 'Effort',
      score: (results.pillarScores['Valuing Effort'] / 16) * 100
    },
    {
      pillar: 'Challenges',
      score: (results.pillarScores['Thriving on Challenges'] / 16) * 100
    },
    {
      pillar: 'Failures',
      score: (results.pillarScores['Learning from Failures'] / 16) * 100
    }
  ] : [];

  const barData = results ? [
    { name: 'Beliefs About Potential', score: results.pillarScores['Beliefs About Potential'], max: 16 },
    { name: 'Valuing Effort', score: results.pillarScores['Valuing Effort'], max: 16 },
    { name: 'Thriving on Challenges', score: results.pillarScores['Thriving on Challenges'], max: 16 },
    { name: 'Learning from Failures', score: results.pillarScores['Learning from Failures'], max: 16 }
  ] : [];

  const getTopStrength = () => {
    if (!results) return null;
    const pillars = Object.entries(results.pillarScores);
    return pillars.reduce((max, curr) => curr[1] > max[1] ? curr : max);
  };

  const getPriorityArea = () => {
    if (!results) return null;
    const pillars = Object.entries(results.pillarScores);
    return pillars.reduce((min, curr) => curr[1] < min[1] ? curr : min);
  };

  // Logo Component
  const Logo = ({ size = 'large' }) => {
    const dimensions = size === 'large' ? { width: '300px', height: 'auto' } : { width: '120px', height: 'auto' };
    return (
      <img 
        src={LOGO_URL} 
        alt="Effilor Consulting Services" 
        style={dimensions}
        className="object-contain"
      />
    );
  };

  // Header with small logo (for all screens except welcome) - centered and smaller
  const Header = () => (
    <div className="w-full flex justify-center py-4">
      <Logo size="small" />
    </div>
  );

  // Welcome Screen
  if (currentScreen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo size="large" />
            </div>
            <p style={{ color: '#6B3D7A' }} className="text-lg">
              <span className="font-bold">Eff</span>ective{' '}
              <span className="font-bold">I</span>ndividuals{' '}
              <span className="font-bold">L</span>eaders &{' '}
              <span className="font-bold">Or</span>ganisations
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Growth Mindset Assessment
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover how your organization views Potential, values Effort, embraces Challenges, and learns from Failures
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
              <p className="text-blue-900 text-lg leading-relaxed">
                📋 <strong>Please answer all questions from your organization's perspective</strong> - not your personal views. Think about how your organization as a whole operates, not just your team or department.
              </p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
              <p className="text-purple-900 text-lg leading-relaxed">
                ✨ <strong>You'll see your complete results immediately - no email required.</strong> We'll only ask for your contact details if you want to download the full report.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">16</div>
                <div className="text-gray-600">Questions</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold" style={{ color: '#6B3D7A' }}>7-10</div>
                <div className="text-gray-600">Minutes</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                <div className="text-gray-600">Pillars Analyzed</div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-gray-900">You'll discover:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">How your organization views employee potential and development</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Whether effort and persistence are truly valued in your culture</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Your organization's appetite for challenges and experimentation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">How failures are perceived and leveraged for learning</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentScreen('questions')}
              className="w-full py-4 px-8 text-xl font-bold text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center"
              style={{ backgroundColor: '#6B3D7A' }}
            >
              Start Assessment
              <ArrowRight className="ml-2 w-6 h-6" />
            </button>
          </div>

          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>© 2025 Effilor Consulting Services. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  // Questions Screen
  if (currentScreen === 'questions') {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 pt-24">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium" style={{ color: '#6B3D7A' }}>
                {question.pillar}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: '#6B3D7A' }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {question.text}
            </h2>

            <div className="space-y-4 mb-6">
              {question.options.map((option, index) => {
                const isSelected = answers[currentQuestion] === option.value;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                      isSelected 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold ${
                        isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800">{option.label}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="w-full py-3 px-6 text-lg font-bold rounded-xl border-2 transition-all"
                style={{ borderColor: '#6B3D7A', color: '#6B3D7A' }}
              >
                ← Previous Question
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (currentScreen === 'results') {
    const topStrength = getTopStrength();
    const priorityArea = getPriorityArea();

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-12 pt-24">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span style={{ color: '#3D3D7A' }}>Your Growth Mindset Results</span>
            </h1>
            <p className="text-gray-600">Based on your responses across 4 key dimensions</p>
          </div>

          {/* Overall Score */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Growth Mindset Score</h2>
            <div className="text-7xl font-bold mb-4" style={{ color: '#6B3D7A' }}>
              {results.percentageScore}%
            </div>
            <div className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${results.level.color} text-white mb-4`}>
              {results.level.name}
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {results.percentageScore >= 80 && "Your organization demonstrates exceptional commitment to growth mindset principles across all dimensions."}
              {results.percentageScore >= 65 && results.percentageScore < 80 && "Your organization shows strong growth mindset orientation with room for continued development."}
              {results.percentageScore >= 50 && results.percentageScore < 65 && "Your organization exhibits a mix of growth and fixed mindset practices with significant opportunity for improvement."}
              {results.percentageScore >= 35 && results.percentageScore < 50 && "Your organization leans toward fixed mindset practices but has potential to shift toward growth orientation."}
              {results.percentageScore < 35 && "Your organization shows predominantly fixed mindset characteristics with substantial opportunity for cultural transformation."}
            </p>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Growth Mindset Profile</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="pillar" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Your Score" dataKey="score" stroke="#6B3D7A" fill="#6B3D7A" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Pillar Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={120} interval={0} style={{ fontSize: '12px' }} />
                  <YAxis domain={[0, 16]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#6B3D7A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-3">🎯 Top Strength</h3>
              <p className="text-lg font-semibold text-green-900 mb-2">{topStrength[0]}</p>
              <p className="text-green-700">
                Score: {topStrength[1]}/16 ({Math.round((topStrength[1] / 16) * 100)}%)
              </p>
              <p className="text-green-800 mt-3">
                This is your strongest dimension. Leverage this strength as a foundation for developing other areas.
              </p>
            </div>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-orange-800 mb-3">🎯 Priority Area</h3>
              <p className="text-lg font-semibold text-orange-900 mb-2">{priorityArea[0]}</p>
              <p className="text-orange-700">
                Score: {priorityArea[1]}/16 ({Math.round((priorityArea[1] / 16) * 100)}%)
              </p>
              <p className="text-orange-800 mt-3">
                Focus here for maximum impact. Improving this dimension will significantly enhance your organization's growth mindset.
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Pillar Analysis</h3>
            <div className="space-y-6">
              {Object.entries(results.pillarScores).map(([pillar, score]) => {
                const level = getPillarLevel(score);
                return (
                  <div key={pillar} className="border-l-4 pl-6" style={{ borderColor: '#6B3D7A' }}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-900">{pillar}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${level.color}`}>
                        {level.name}
                      </span>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="text-2xl font-bold mr-2" style={{ color: '#6B3D7A' }}>{score}</div>
                      <div className="text-gray-500">/ 16</div>
                      <div className="ml-4 text-lg text-gray-600">({Math.round((score / 16) * 100)}%)</div>
                    </div>
                    <p className="text-gray-700">
                      {pillar === 'Beliefs About Potential' && (score >= 14 ? "Your organization strongly believes in people's ability to grow and develop capabilities." : score >= 11 ? "Your organization shows good belief in development potential with room to strengthen." : score >= 8 ? "Your organization has emerging belief in growth potential that needs reinforcement." : "Your organization tends toward fixed beliefs about capabilities - significant opportunity for mindset shift.")}
                      {pillar === 'Valuing Effort' && (score >= 14 ? "Your organization consistently recognizes and celebrates effort and persistence." : score >= 11 ? "Your organization values effort but could strengthen this emphasis." : score >= 8 ? "Your organization shows some appreciation for effort but needs more consistent practice." : "Your organization primarily focuses on outcomes over effort - opportunity to rebalance recognition.")}
                      {pillar === 'Thriving on Challenges' && (score >= 14 ? "Your organization actively seeks challenges and creates opportunities for growth through stretch assignments." : score >= 11 ? "Your organization is reasonably comfortable with challenges but could push boundaries more." : score >= 8 ? "Your organization shows moderate comfort with challenges but tends toward safer choices." : "Your organization prioritizes safety over challenge - opportunity to build risk-taking culture.")}
                      {pillar === 'Learning from Failures' && (score >= 14 ? "Your organization has created exceptional psychological safety and truly learns from setbacks." : score >= 11 ? "Your organization handles failures constructively with room to celebrate learning more openly." : score >= 8 ? "Your organization acknowledges failures but could do more to extract and share learnings." : "Your organization struggles with failure - building psychological safety should be a priority.")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA to Email Gate */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-center text-white mb-8">
            <h3 className="text-3xl font-bold mb-4">Want to Save and Share These Results?</h3>
            <p className="text-xl mb-6">Get your complete analysis as a downloadable report</p>
            <button
              onClick={() => setCurrentScreen('email')}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <Download className="mr-2" />
              Download Full Report
            </button>
          </div>

          {/* Additional Engagement Hooks */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 Want a Deeper Dive?</h3>
              <p className="text-gray-700 mb-4">
                Get a comprehensive organizational assessment with individual evaluations across your leadership team.
              </p>
              <a
                href="https://effilor.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-xl font-bold transition-all"
                style={{ backgroundColor: '#6B3D7A', color: 'white' }}
              >
                Request Team Assessment
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">💡 Explore More Resources</h3>
              <p className="text-gray-700 mb-4">
                Discover our full library of assessments, toolkits, and insights to accelerate your growth.
              </p>
              <a
                href="https://effilor.com/resources"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-xl font-bold border-2 transition-all"
                style={{ borderColor: '#6B3D7A', color: '#6B3D7A' }}
              >
                Browse Resources
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Email Capture Screen
  if (currentScreen === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-12 pt-24">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Get Your Complete Report
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Enter your details below and we'll send you a comprehensive report with all your results and insights.
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  placeholder="your.email@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={userData.company}
                  onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
                  placeholder="Your organization name"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 text-xl font-bold text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center"
                style={{ backgroundColor: '#6B3D7A' }}
              >
                <Download className="mr-2" />
                Download Full Report
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              We respect your privacy. Your information will only be used to send you the report and occasional insights from Effilor.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Thank You Screen
  // Thank You Screen
  if (currentScreen === 'thankyou') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-12 pt-24">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You, {userData.name}!
            </h2>
            
            <div className="bg-purple-50 rounded-xl p-6 mb-8">
              <p className="text-lg text-gray-700 mb-4">
                Your Growth Mindset Assessment has been submitted successfully.
              </p>
              <p className="text-xl font-bold mb-2" style={{ color: '#6B3D7A' }}>
                Your detailed assessment report will be sent to:
              </p>
              <p className="text-xl font-bold text-gray-900 mb-4">
                {userData.email}
              </p>
              <p className="text-gray-600">
                Please allow up to 24 hours for your personalized report to arrive.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h3>

              <a
                href="https://effilor.com/resources"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 text-lg font-bold rounded-xl border-2 transition-all hover:scale-105"
                style={{ borderColor: '#6B3D7A', color: '#6B3D7A' }}
              >
                <div className="flex items-center justify-center">
                  <span>📚 Explore More Resources</span>
                  <ExternalLink className="ml-2 w-5 h-5" />
                </div>
              </a>

              <a
                href="https://effilor.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 text-lg font-bold text-white rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: '#6B3D7A' }}
              >
                <div className="flex items-center justify-center">
                  <span>📅 Schedule a Consultation</span>
                  <ExternalLink className="ml-2 w-5 h-5" />
                </div>
              </a>

              <a
                href="https://effilor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 text-lg font-bold rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center justify-center">
                  <span>🏠 Back to Effilor.com</span>
                  <ExternalLink className="ml-2 w-5 h-5" />
                </div>
              </a>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-2">Questions about your results?</p>
            <p className="text-sm text-gray-500">
              Contact Raj at raj.dharmaraj@effilor.com
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
