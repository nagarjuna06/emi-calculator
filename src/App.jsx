import { useEffect, useState } from "react";
import "./App.css";
import { numberWithCommas } from "./utills/format";
import { tenures } from "./utills/constants";
import TextInput from "./components/text-input";
import SliderInput from "./components/slider-input";
const App = () => {
  const [cost, setCost] = useState(0);
  const [interestRate, setInterestRate] = useState(1);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState(0);
  const [tenure, setTenure] = useState(tenures[0]);
  const calculateEMI = (downPayment) => {
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    if (!cost) return;
    const P = cost - downPayment;
    const R = interestRate / 100;
    const N = tenure / 12;
    const EMI = (P * R * (1 + R) ** N) / ((1 + R) ** N - 1);
    return Number(EMI / 12).toFixed(0);
  };
  const calculateDownPayment = (emi) => {
    if (!cost) return;
    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };
  const updateEmi = (downPayment) => {
    if (!cost) return;
    const dp = Number(downPayment);
    setDownPayment(dp.toFixed(0));
    const EMI = calculateEMI(dp);
    setEmi(EMI);
  };

  const updateDownPayment = (emi) => {
    if (!cost) return;
    const em = Number(emi);
    setEmi(em.toFixed(0));
    const dp = calculateDownPayment(em);
    setDownPayment(dp);
  };

  useEffect(() => {
    if (!cost) {
      setEmi(0);
      setDownPayment(0);
    }
    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [cost, tenure, interestRate]);

  const totalEmi = () => numberWithCommas((emi * tenure).toFixed(0));
  const totalDownPayment = () =>
    numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  return (
    <div className="App">
      <h3 className="main__title">EMI Calculator</h3>
      {/* Total cost */}
      <TextInput
        title="Total Cost"
        state={cost}
        setState={setCost}
        placeholder="Enter Cost"
      />
      {/* Interest rate */}
      <SliderInput
        title="Interest Rate(in %)"
        min={1}
        max={100}
        state={interestRate}
        labelMin="0%"
        value={interestRate}
        labelMax="100%"
        onChange={setInterestRate}
      />
      {/* Processing fee (in %) */}
      <SliderInput
        title="Processing Fee (in %)"
        min={1}
        max={100}
        labelMin="0%"
        value={fee}
        labelMax="100%"
        state={fee}
        onChange={setFee}
      />
      {/* Down Payment */}
      <SliderInput
        title="Down Payment"
        min={0}
        max={cost}
        labelMin="0%"
        labelMax="100%"
        state={downPayment}
        onChange={updateEmi}
        value={numberWithCommas(downPayment)}
        result={`Total Down payment : ${totalDownPayment()}`}
      />
      <SliderInput
        title="Loan Per Month"
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
        state={emi}
        labelMin={numberWithCommas(calculateEMI(cost))}
        labelMax={numberWithCommas(calculateEMI(0))}
        onChange={updateDownPayment}
        value={numberWithCommas(emi)}
        result={`Total EMI: ${totalEmi()}`}
      />
      <span>Tenure</span>
      <div className="tenure">
        {tenures.map((t) => (
          <button
            key={t}
            className={tenure === t ? "tenure__selected" : ""}
            onClick={() => setTenure(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="footer">
        Made with ❤️ by{" "}
        <a href="https://nagarjuna.vercel.app/">Nagarjuna Chenna</a>
      </div>
    </div>
  );
};

export default App;
