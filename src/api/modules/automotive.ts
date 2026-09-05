// Automotive Tools & Guarded AI Diagnostics Service

import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';
import { ApiResponse } from '../types';
import { DTCCode, AIAssistantMessage } from '../../types';

// Pre-seeded offline common DTC lookup database for workshop connectivity resilience
export const OFFLINE_DTC_DATABASE: DTCCode[] = [
  {
    code: 'P0300',
    category: 'POWERTRAIN',
    title: 'Random / Multiple Cylinder Misfire Detected',
    description:
      'The engine control module (ECM) detects that more than one cylinder is misfiring. This may cause catalyst damage if driven aggressively.',
    commonCauses: [
      'Worn or fouled spark plugs',
      'Faulty ignition coil packs',
      'Clogged fuel injectors',
      'Vacuum leak in intake manifold',
      'Low fuel pressure / faulty fuel pump',
    ],
    symptoms: [
      'Check Engine Light flashing or solid',
      'Engine hesitation or severe shaking on idle',
      'Loss of engine power and poor acceleration',
      'Increased fuel consumption & fuel smell',
    ],
    diagnosticSteps: [
      'Inspect spark plug tips for oil fouling or carbon buildup.',
      'Perform ignition coil swap test on affected cylinders.',
      'Check fuel rail pressure using mechanical gauge.',
      'Perform smoke test on vacuum hoses and intake gaskets.',
    ],
    severity: 'HIGH',
  },
  {
    code: 'P0420',
    category: 'POWERTRAIN',
    title: 'Catalyst System Efficiency Below Threshold (Bank 1)',
    description:
      'The downstream oxygen sensor signal mirrors the upstream sensor, indicating the catalytic converter is not effectively reducing exhaust emissions.',
    commonCauses: [
      'Degraded catalytic converter (Bank 1)',
      'Faulty downstream heated oxygen sensor (O2S)',
      'Exhaust manifold or exhaust pipe leak',
      'Engine running rich due to leaking injector',
    ],
    symptoms: [
      'Check Engine Light illuminated',
      'Subtle decrease in high-RPM performance',
      'Rotten egg / sulfur smell from exhaust',
    ],
    diagnosticSteps: [
      'Inspect exhaust system between cylinder head and cat for cracks/leaks.',
      'Graph upstream vs downstream O2 sensor live waveforms using scanner.',
      'Check engine fuel trims for long-term rich/lean skew.',
    ],
    severity: 'MEDIUM',
  },
  {
    code: 'P0171',
    category: 'POWERTRAIN',
    title: 'System Too Lean (Bank 1)',
    description:
      'The ECM is adding maximum positive fuel trim because the air-fuel mixture contains too much oxygen compared to fuel.',
    commonCauses: [
      'Dirty or faulty Mass Airflow Sensor (MAF)',
      'Vacuum leak (PCV hose, intake boot, brake booster)',
      'Weak fuel pump or clogged fuel filter',
      'Stuck open EGR valve',
    ],
    symptoms: [
      'Rough idle, stalling at stop lights',
      'Engine knocking or pinging under load',
      'Slow throttle response',
    ],
    diagnosticSteps: [
      'Clean MAF sensor with dedicated MAF cleaner spray.',
      'Perform smoke test on intake tube and PCV valve system.',
      'Check live short-term and long-term fuel trim values at idle vs 2500 RPM.',
    ],
    severity: 'HIGH',
  },
  {
    code: 'P0700',
    category: 'POWERTRAIN',
    title: 'Transmission Control System (MIL Request)',
    description:
      'The Transmission Control Module (TCM) detected a fault and requested the ECM to illuminate the Check Engine Light.',
    commonCauses: [
      'Transmission solenoid malfunction',
      'Low or degraded ATF fluid level',
      'TCM wiring harness or connector corrosion',
      'Torque converter clutch slipping',
    ],
    symptoms: [
      'Transmission slipping or harsh gear shifts',
      'Vehicle stuck in limp mode (3rd gear)',
      'Overheating transmission fluid',
    ],
    diagnosticSteps: [
      'Connect diagnostic tool to scan TCM for secondary P07xx codes.',
      'Check transmission fluid level, color, and burnt smell.',
      'Inspect wiring harness plug at transmission housing for oil intrusion.',
    ],
    severity: 'HIGH',
  },
  {
    code: 'C0035',
    category: 'CHASSIS',
    title: 'Left Front Wheel Speed Sensor Circuit Fault',
    description:
      'The ABS module cannot read an accurate rotational speed signal from the left front wheel hub sensor.',
    commonCauses: [
      'Damaged ABS sensor wiring or debris on tone ring',
      'Faulty wheel bearing with built-in magnetic encoder ring',
      'Corroded wheel speed sensor connector',
    ],
    symptoms: [
      'ABS and Traction Control lights illuminated',
      'Pulsing brake pedal at low-speed dry stops',
    ],
    diagnosticSteps: [
      'Inspect sensor harness for chafing or severed wires near suspension.',
      'Measure resistance across sensor terminals with multimeter.',
      'Spin wheel while reading live wheel speed PID on scan tool.',
    ],
    severity: 'MEDIUM',
  },
];

export const automotiveApi = {
  async searchDTC(query: string): Promise<DTCCode[]> {
    const q = query.trim().toUpperCase();
    try {
      const response = await apiClient.get<ApiResponse<DTCCode[]>>(
        API_ENDPOINTS.AUTOMOTIVE.DTC_SEARCH,
        { params: { q } }
      );
      if (response.data.data && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch {
      // fallback to offline database
    }

    return OFFLINE_DTC_DATABASE.filter(
      (item) =>
        item.code.includes(q) ||
        item.title.toUpperCase().includes(q) ||
        item.category.includes(q)
    );
  },

  async getDTCDetail(code: string): Promise<DTCCode | null> {
    const cleanCode = code.trim().toUpperCase();
    try {
      const response = await apiClient.get<ApiResponse<DTCCode>>(
        API_ENDPOINTS.AUTOMOTIVE.DTC_DETAIL(cleanCode)
      );
      return response.data.data;
    } catch {
      const found = OFFLINE_DTC_DATABASE.find((item) => item.code === cleanCode);
      return found ?? null;
    }
  },

  async askAIAssistant(
    prompt: string,
    history: AIAssistantMessage[] = []
  ): Promise<AIAssistantMessage> {
    try {
      const response = await apiClient.post<ApiResponse<AIAssistantMessage>>(
        API_ENDPOINTS.AUTOMOTIVE.AI_ASSISTANT_CHAT,
        { prompt, history }
      );
      return response.data.data;
    } catch {
      // Controlled safe fallback response
      return {
        id: `ai_${Date.now()}`,
        sender: 'AI',
        text: `Diagnostic Insight for: "${prompt}"\n\n1. Check primary power & ground integrity at the relevant actuator/sensor.\n2. Verify live data stream PIDs with your scan tool before replacing components.\n3. Test for vacuum leaks or harness resistance faults if code relates to fuel/air trimming.`,
        timestamp: new Date().toISOString(),
        suggestedDTCs: ['P0300', 'P0171'],
        safetyCaveat:
          '⚠️ Notice: This AI Assistant provides diagnostic reference only. Always confirm mechanical safety, isolate electrical circuits, and adhere to official workshop OEM repair procedures. AI recommendations never approve certifications, memberships, or warranty decisions.',
      };
    }
  },
};
