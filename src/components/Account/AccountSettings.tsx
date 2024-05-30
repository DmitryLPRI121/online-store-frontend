import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function AccountSettings() {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [newName, setNewName] = useState('');
  const [newSurName, setNewSurName] = useState('');
  const [newMiddleName, setNewMiddleName] = useState('');

  const handleChangePassword = async () => {
    try {
      await axios.post(`http://localhost:8080/Accounts/ChangePassword?currentPassword=${oldPassword}&newPassword=${newPassword}`, {}, {
        withCredentials: true,
      });
      toast('Пароль успешно изменен');
    } catch (error) {
      console.error('Error changing password', error);
    }
  };

  const handleChangeEmail = async () => {
    try {
      await axios.post(`http://localhost:8080/Accounts/ChangeEmail?newEmail=${newEmail}&password=${currentPassword}`, {}, {
        withCredentials: true,
      });
      toast('Email успешно изменен');
    } catch (error) {
      console.error('Error changing email', error);
    }
  };

  const handleChangePhoneNumber = async () => {
    try {
      await axios.post(`http://localhost:8080/Accounts/ChangePhoneNumber?newPhoneNumber=${newPhoneNumber}&password=${currentPassword}`, {}, {
        withCredentials: true,
      });
      toast('Номер телефона успешно изменен');
    } catch (error) {
      console.error('Error changing phone number', error);
    }
  };

  const handleChangeUserInfo = async () => {
    try {
      await axios.post(`http://localhost:8080/Accounts/ChangeUserInfo?birthDate=2024-05-17T14:08:38.486351Z&surName=${newSurName}&name=${newName}&middleName=${newMiddleName}`, {}, {
        withCredentials: true,
      });
      toast('Информация о пользователе успешно изменена');
    } catch (error) {
      console.error('Error changing user info', error);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-4xl font-semibold pb-10">Настройки</h2>
        <div>
          <div className="flex flex-col gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Сменить пароль</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Сменить пароль</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="oldPassword" className="text-right">
                      Старый пароль
                    </Label>
                    <Input
                      id="oldPassword"
                      className="col-span-3"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newPassword" className="text-right">
                      Новый пароль
                    </Label>
                    <Input
                      id="newPassword"
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                  <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Закрыть
                        </Button>
                      </DialogClose>
                      <Button type="submit" onClick={handleChangePassword}>Сохранить</Button>
                    </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Поменять почту</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Смена почты</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newEmail" className="text-right">
                      Новая почта
                    </Label>
                    <Input
                      id="newEmail"
                      className="col-span-3"
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="currentPassword" className="text-right">
                      Пароль
                    </Label>
                    <Input
                      id="currentPassword"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                  <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Закрыть
                        </Button>
                      </DialogClose>
                <Button type="submit" onClick={handleChangeEmail}>Сохранить</Button>
                    </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Поменять телефон</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Смена телефона</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newPhoneNumber" className="text-right">
                      Новый телефон
                    </Label>
                    <Input
                      id="newPhoneNumber"
                      className="col-span-3"
                      onChange={(e) => setNewPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="currentPasswordForPhone" className="text-right">
                      Пароль
                    </Label>
                    <Input
                      id="currentPasswordForPhone"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                   <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Закрыть
                        </Button>
                      </DialogClose>
                <Button type="submit" onClick={handleChangePhoneNumber}>Сохранить</Button>
                    </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Изменить информацию о пользователе</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Изменить информацию о пользователе</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newName" className="text-right">
                      Имя
                    </Label>
                    <Input
                      id="newName"
                      className="col-span-3"
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newSurName" className="text-right">
                      Фамилия
                    </Label>
                    <Input
                      id="newSurName"
                      className="col-span-3"
                      onChange={(e) => setNewSurName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="newMiddleName" className="text-right">
                      Отчество
                    </Label>
                    <Input
                      id="newMiddleName"
                      className="col-span-3"
                      onChange={(e) => setNewMiddleName(e.target.value)}
                    />
                  </div>
                </div>
                  <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Закрыть
                        </Button>
                      </DialogClose>
                <Button type="submit" onClick={handleChangeUserInfo}>Сохранить</Button>
                    </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
