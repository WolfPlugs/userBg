import { Injector, Logger, webpack } from "replugged";
import "./style.css";
const inject = new Injector();

export async function start(): Promise<void> {
  const mod = webpack.getBySource(/banner:(this\.banner)/);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject.after(mod as any, "Z", (args, res) => {
    if (!res) return;
    fetch(`https://raw.githubusercontent.com/AutumnVN/usrbg/main/dist/${res.userId}.txt`).then(
      (r) => {
        if (r.status === 404) return;
        void r.text().then((text) => {
          res.banner = text;
        });
      },
    );
  });
}

export function stop(): void {
  inject.uninjectAll();
}
