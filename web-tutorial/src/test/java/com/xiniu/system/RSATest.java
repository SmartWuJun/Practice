package com.xiniu.system;

import com.xiniunet.supporting.sso.common.encrypt.RSA;

import java.util.Map;

public class RSATest {
	public static void main(String[] args) throws Exception {
		Map<String, Object> map = RSA.genKeyPair();
		System.out.println("------以下为公钥------");
		System.out.println(RSA.getPublicKey(map));
		System.out.println("------以下为私钥------");
		System.out.println(RSA.getPrivateKey(map));
	}
}
