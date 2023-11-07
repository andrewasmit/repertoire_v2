import { Ensemble } from "../redux/organizationSlice";

export const findEnsembleName: (ensembles: Ensemble[], id: number) => string = (
  ensembles,
  id: number
) => {
  const targetEns = ensembles.filter((ens) => ens.id === id)[0];
  return targetEns.name;
};
