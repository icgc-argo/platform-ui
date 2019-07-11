import EgoPolicies from './ego-policies';
import GlobalPolicies from './global-policies';
import ProgramServicePolicies from './program-service-policies';

export const POLICIES = [...GlobalPolicies, ...EgoPolicies, ...ProgramServicePolicies];
